import S3 from "aws-sdk/clients/s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { v4 as uuidv4 } from "uuid";
import { NextFunction, Request, Response } from "express";
import {
  ACCESS_KEY_AWS,
  SECRET_KEY_AWS,
  BUCKET_NAME,
  BUCKET_REGION,
} from "../util/env.vars";
const MAX_SIZE: number = 2100000;

const s3 = new S3({
  region: BUCKET_REGION,
  accessKeyId: ACCESS_KEY_AWS,
  secretAccessKey: SECRET_KEY_AWS,
});
const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid Mime Type"), false);
  }
};
const multerS3Upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    acl: "public-read-write",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, uuidv4() + "_" + file.originalname);
    },
  }),
  limits: { fileSize: MAX_SIZE },
}).single("profile_picture");

/* Middleware to export */
export function goUpload(req: Request, res: Response, next: NextFunction) {
  multerS3Upload(req, res, function (err: any) {
    if (err) {
      return res.status(422).json({
        error: err.message,
        status_code: 422,
      });
    }
    next();
  });
}
