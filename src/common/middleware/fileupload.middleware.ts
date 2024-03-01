import { v2 as cloudinary } from 'cloudinary';
import { NextFunction, Request, Response } from "express";
import multer, { Multer } from "multer";
import streamifier from "streamifier"
import { EnvConfig } from "../../config/envConfig";
import { ExpressError } from "../class/error";



cloudinary.config({
    cloud_name: EnvConfig.cloudinaryConfig.name,
    api_key: EnvConfig.cloudinaryConfig.apiKey,
    api_secret: EnvConfig.cloudinaryConfig.secret,
});


interface UploadedFiles {
    [fieldname: string]: Express.Multer.File[];
}
const uploadImage = () => {
    const parseImage = () => {
        const storage = multer.memoryStorage();
        const upload = multer({ storage: storage }).fields([
            { name: "secondaryImage", maxCount: 1 },
            { name: "thumbnail", maxCount: 1 },
        ]);
        
        return upload;
    };

    const uploadToCloudinary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
        
            const uploadImageIntoCloudinary = (image: Express.Multer.File) => {
                return new Promise((resolve, reject) => {
                    let cld_upload_stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "PokharRentals",
                        },
                        function (error, result) {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );

                    if (image && image.buffer) {
                        streamifier.createReadStream(image.buffer).pipe(cld_upload_stream);
                    } else {
                        reject(new Error("No image buffer provided"));
                    }
                });
            };
            if ((req.files as UploadedFiles)?.thumbnail && (req.files as UploadedFiles).thumbnail?.length) {
                const thumbnail: any = await uploadImageIntoCloudinary(
                    (req.files as UploadedFiles).thumbnail[0]
                );

             
                req.body.thumbnail = thumbnail.secure_url || thumbnail.url;
              
            }

            if ((req.files as UploadedFiles)?.secondaryImage && (req.files as UploadedFiles).secondaryImage?.length) {
     

                const secondaryImage: any = await uploadImageIntoCloudinary(
                    (req.files as UploadedFiles)?.secondaryImage[0]
                );
               
 
                req.body.secondaryImage = secondaryImage.secure_url || secondaryImage.url;
            }
        
            next();
        } catch (e) {
        
            res.status(500).send("Couldn't upload Image");
        }
    };
    return [parseImage(), uploadToCloudinary];
};

export default uploadImage;


