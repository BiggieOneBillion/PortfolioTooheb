// lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export function uploadFileToCloudinary(filePath: string, folder = "homepage") {
  return new Promise<{
    url: string;
    public_id: string;
    secure_url: string;
  }>((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      { folder },
      (error: any, result: any) => {
        if (error) reject(error);
        else resolve({ url: result.url, public_id: result.public_id, secure_url: result.secure_url });
      }
    );
  });
}