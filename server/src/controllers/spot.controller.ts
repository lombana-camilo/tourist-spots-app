import console from "console";
import { Request, Response } from "express";
import { get } from "lodash";
import cloudinary from "./../utils/cloudinary";
import ReviewModel from "./../models/review.model";
import {
  CreateSpotType,
  DeleteSpotType,
  FindSpotType,
  UpdateSpotType,
} from "./../schemas/spot.schema";
import {
  createSpot,
  deleteSpot,
  findSpot,
  getSpots,
  updateSpot,
} from "./../services/spot.service";
import { geoCoder } from "./../utils/mapbox";

export const getSpotsHandler = async (_: Request, res: Response) => {
  try {
    const spots = await getSpots();
    const thumbSpots = spots.map((spot) => {
         spot.images = spot.thumbnail
         return spot
    });
    return res.send(thumbSpots.reverse());
  } catch (e) {
    return res.sendStatus(404);
  }
};

export const findSpotHandler = async (
  req: Request<FindSpotType["params"]>,
  res: Response
) => {
  try {
    const spot = await findSpot({ _id: req.params.spotId });
    return res.send(spot);
  } catch (e) {
    return res.sendStatus(404);
  }
};

interface MulterRequest extends Request {
  files: Express.Multer.File[];
}
export const createSpotHandler = async (
  req: Request<{}, {}, CreateSpotType["body"]>,
  res: Response
) => {
  //MapBox
  const geoData = await geoCoder
    .forwardGeocode({
      query: req.body.location,
      limit: 1,
    })
    .send();
  if (!geoData.body.features.length) {
    return res.status(400).send("Please enter a valid location");
  }

  const userId = res.locals.user._id;
  const multerFiles = (req as MulterRequest).files;
  // console.log({ multerFiles });
  // console.log("body",req.body);
  const images = multerFiles.map((file) => {
    return { url: file.path, filename: file.filename };
  });
  const newSpot = await createSpot({
    ...req.body,
    images,
    geometry: geoData.body.features[0].geometry,
    user: userId,
    reviews: [],
  });
  return res.send(newSpot);
};

export const updateSpotHandler = async (
  req: Request<UpdateSpotType["params"], {}, UpdateSpotType["body"]>,
  res: Response
) => {
  const multerFiles = (req as MulterRequest).files;
  // console.log("body", req.body);
  // console.log({ multerFiles });
  //Get user _id
  const userId = res.locals.user._id;
  //Find Spot to update
  const spotId = req.params.spotId;
  const spot = await findSpot({ _id: spotId });
  if (!spot) {
    return res.sendStatus(404);
  }
  // Ownership constrol
  if (get(spot.user, "_id").toString() !== userId) {
    return res
      .status(403)
      .send("You do not have permission to update this spot!");
  }
  //Update spot data
  const newImages = multerFiles?.map((file) => {
    return { url: file.path, filename: file.filename };
  });
  const updated = await updateSpot({ _id: spotId }, req.body, { new: true });
  updated?.images.push(...newImages);
  updated?.save();

  //Delete requested images
  if (req.body.deleteImages && req.body.deleteImages.length) {
    await updated?.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
    //Delete from cloudinary
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
  }
  return res.send(updated);
};

export const deleteSpotHandler = async (
  req: Request<DeleteSpotType["params"]>,
  res: Response
) => {
  //Find user _id
  const userId = res.locals.user._id;
  //Find Spot to delete
  const spotId = req.params.spotId;
  const spot = await findSpot({ _id: spotId });
  if (!spot) {
    return res.sendStatus(404);
  }

  // Ownership constrol
  if (get(spot.user, "_id").toString() !== userId) {
    return res
      .status(403)
      .send("You do not have permission to delete this spot!");
  }
  //Delete spot
  const deleted = await deleteSpot({ _id: spotId });

  //Delete Reviews' associations
  await ReviewModel.deleteMany({ spotId });
  //Delete spot images from cloudinary
  spot.images.forEach(async (img) => {
    await cloudinary.uploader.destroy(img.filename);
  });
  return res.send(deleted);
};
