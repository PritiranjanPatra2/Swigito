import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  export const  uploadToCloudinary = async (file) =>{
    const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
         { folder: "books" },
         (error, result) => {
             if(error) reject(error);
             else resolve(result);
         }
        );
        uploadStream.end(file);
    });
 return result;
}