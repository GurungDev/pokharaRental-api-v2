// import { v2 as cloudinary } from 'cloudinary';
// import { NextFunction, Request, Response } from "express";
// import multer from "multer";
// import streamifier from "streamifier"
// import { EnvConfig } from "../../config/envConfig";
// import { ExpressError } from "../class/error";

 

// cloudinary.config({ 
//   cloud_name: EnvConfig.cloudinaryConfig.name, 
//   api_key: EnvConfig.cloudinaryConfig.apiKey, 
//   api_secret: EnvConfig.cloudinaryConfig.secret, 
// });

// interface fileUploadOptions {
//   maxCount?: number;
//   requiresThumbnail?: boolean;
//   maxSizeInMb?: number 
// }
// /**
//  * multer store file in memory & to be uploaded to s3
//  * @param fileUploadOptions
//  * @returns
//  */

// export function uploadFile(options?: fileUploadOptions) {

//   return [
//     parseFile(options?.maxCount, options?.maxSizeInMb),
//     s3uploadWrapper(options?.requiresThumbnail),
//   ];
// }

 

// function parseFile(
//   maxCount: number = 1,
//   maxSizeInMb: number =  5 
// ) {
//   const storage = multer.memoryStorage();
//   const fileSize = maxSizeInMb * 1024 * 1024; // 5MB

//   //creating allowed file type
//   const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

//   //sorting fields to get data from 
//   const field = [({ name: "assets", maxCount })]
  

//   //filters the file
//   const fileFilter = (
//     req: Request,
//     file: Express.Multer.File,
//     cb: multer.FileFilterCallback
//   ) => {
//     if (allowedFileTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new ExpressError(400, `Assets must be of appropriate format.`));
//     }
//   };

//   //uploads the file
//   const upload = multer({
//     storage,
//     fileFilter,
//     limits: {
//       fileSize,
//     },
//   }).fields(field);
 
//   return upload;
// }



// function s3uploadWrapper(requiresThumbnail: boolean = false) {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const parsedFiles = req.files as {
//         [fieldname: string]: Express.Multer.File[];
//       };

//       const assets = parsedFiles?.assets;

//       if (assets) {
//         let assetsToUploadPromise = [];
//         for (let i = 0; i < assets.length; i++) {
//           assetsToUploadPromise.push(
//             uploadToCloud(
//               assets[i].buffer,
//               assets[i].mimetype,
//               // null
//               requiresThumbnail ? await fileCompressor(assets[i].buffer) : null
//             )
//           );
//         }
//         req.body.assets = await Promise.all(assetsToUploadPromise);
//       }

 
//       const uploadImageIntoCloudinary = (image) => {
//         return new Promise((resolve, reject) => {
//           let cld_upload_stream = cloudinary.uploader.upload_stream(
//             {
//               folder: "PokharRentals",
//             },
//             function (error, result) {
//               if (error) {
//                 reject(error);
//               } else {
//                 resolve(result);
//               }
//             }
//           );

//           streamifier.createReadStream(image.buffer).pipe(cld_upload_stream);
//         });
//       };

//       async function uploadToCloud(
//         buffer: any,
//         mimetype: string,
//         thumbnailBuffer: any
//       ) {
//         const thumbnailAssetKey = assetKey + "-thumbnail";

//         const uploadAssetThumbnailCommand = thumbnailBuffer
//           ? new PutObjectCommand({
//             Bucket: s3Secrets.bucket,
//             ACL: "public-read",
//             // "x-amz-acl": "public-read",
//             Key: thumbnailAssetKey,
//             Body: thumbnailBuffer,
//             ContentType: mimetype,
//             // ...s3Secrets,
//           })
//           : null;

//         const promisesToResolve = [s3Client.send(uploadAssetCommand)];

//         if (uploadAssetThumbnailCommand) {
//           promisesToResolve.push(s3Client.send(uploadAssetThumbnailCommand));
//         }

//         await Promise.all(promisesToResolve);

//         const assetBaseUrl = `${s3Secrets.endpoint}/${s3Secrets.bucket}`;

//         return thumbnailBuffer
//           ? {
//             original: `${assetBaseUrl}/${assetKey}`,
//             thumbnail: `${assetBaseUrl}/${thumbnailAssetKey}`,
//           }
//           : `${assetBaseUrl}/${assetKey}`;
//       }

//       next();
//     } catch (e) {
//       next(e);
//     }
//   };
// }


// // function s3uploadWrapper(requiresThumbnail: boolean = false) {
// //   return async (req: Request, res: Response, next: NextFunction) => {
// //     try {
// //       const s3Client = new S3Client({
// //         region: s3Secrets.region,
// //         endpoint: s3Secrets.endpoint,
// //         forcePathStyle: false,
// //         credentials: {
// //           accessKeyId: s3Secrets.accessKey,
// //           secretAccessKey: s3Secrets.secretKey,
// //         },
// //       });

// //       const parsedFiles = req.files as {
// //         [fieldname: string]: Express.Multer.File[];
// //       };

// //       const assets = parsedFiles?.assets;

// //       if (assets) {
// //         let assetsToUploadPromise = [];
// //         for (let i = 0; i < assets.length; i++) {
// //           assetsToUploadPromise.push(
// //             uploadToCloud(
// //               assets[i].buffer,
// //               assets[i].mimetype,
// //               // null
// //               requiresThumbnail ? await fileCompressor(assets[i].buffer) : null
// //             )
// //           );
// //         }

// //         req.body.assets = await Promise.all(assetsToUploadPromise);
// //       }

// //       async function uploadToCloud(
// //         buffer: any,
// //         mimetype: string,
// //         thumbnailBuffer: any
// //       ) {
// //         const assetKey = uuidv4();
// //         const thumbnailAssetKey = assetKey + "-thumbnail";

// //         const uploadAssetCommand = new PutObjectCommand({
// //           Bucket: s3Secrets.bucket,
// //           ACL: "public-read",
// //           // "x-amz-acl": "public-read",
// //           Key: assetKey,
// //           Body: buffer,
// //           ContentType: mimetype,
// //         });

// //         const uploadAssetThumbnailCommand = thumbnailBuffer
// //           ? new PutObjectCommand({
// //             Bucket: s3Secrets.bucket,
// //             ACL: "public-read",
// //             // "x-amz-acl": "public-read",
// //             Key: thumbnailAssetKey,
// //             Body: thumbnailBuffer,
// //             ContentType: mimetype,
// //             // ...s3Secrets,
// //           })
// //           : null;

// //         const promisesToResolve = [s3Client.send(uploadAssetCommand)];

// //         if (uploadAssetThumbnailCommand) {
// //           promisesToResolve.push(s3Client.send(uploadAssetThumbnailCommand));
// //         }

// //         await Promise.all(promisesToResolve);

// //         const assetBaseUrl = `${s3Secrets.endpoint}/${s3Secrets.bucket}`;

// //         return thumbnailBuffer
// //           ? {
// //             original: `${assetBaseUrl}/${assetKey}`,
// //             thumbnail: `${assetBaseUrl}/${thumbnailAssetKey}`,
// //           }
// //           : `${assetBaseUrl}/${assetKey}`;
// //       }

// //       next();
// //     } catch (e) {
// //       next(e);
// //     }
// //   };
// // }

// async function fileCompressor(buffer: any) {
//   const quality = 100 - EnvConfig.thumbnailCompression;
//   return await sharp(buffer).jpeg({ quality, force: true }).toBuffer();
// }
