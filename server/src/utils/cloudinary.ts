import {v2 as cloudinary} from "cloudinary";
import config from "config";
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: config.get("CLOUDINARY_CLOUD_NAME"),
  api_key: config.get("CLOUDINARY_API_KEY"),
  api_secret: config.get("CLOUDINARY_API_SECRET"),
});

export const storage = new CloudinaryStorage({
   cloudinary:cloudinary,
   params:{
      folder:"tourists-spots",
      allowedFormats:['jpeg','jpg','png']
   }

})

export default cloudinary
