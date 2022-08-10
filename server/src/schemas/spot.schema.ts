import { any, array, custom, object, string, TypeOf, z } from "zod";
import { Express  } from "express";

const payload = {
  body: object({
    title: string({ required_error: "Title is required" }),
    description: string({ required_error: "Description is required" }).min(
      20,
      "Description should be at least 20 chars long"
    ),
    location: string({ required_error: "Location is required" }),
  }),
};

// interface ImageDocument {
//    // [ file:string ]:Express.Multer.File[]
//     fieldname: string
//     originalname: string
//     encoding: string
//     mimetype: string
//     path: string
//     size: number
//     filename: string
// }
//
// interface Images {
//    files:Express.Multer.File[]
// }
//
// const images={
//    // files:z.ZodType<Express.Multer.File>
//    // files:z.ZodType<Images>
//    files:array(object({}))
// }


const params = {
  params: object({
    spotId: string({ required_error: "Spot Id is required" }),
  }),
};

export const createSpotSchema = object({ ...payload });
export const updateSpotSchema = object({ ...payload, ...params });
export const findSpotSchema = object({ ...params });
export const deleteSpotSchema = object({ ...params });

export type CreateSpotType = TypeOf<typeof createSpotSchema>;
export type UpdateSpotType = TypeOf<typeof updateSpotSchema>;
export type FindSpotType = TypeOf<typeof findSpotSchema>;
export type DeleteSpotType = TypeOf<typeof deleteSpotSchema>;
