"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.goUpload = void 0;
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const uuid_1 = require("uuid");
const env_vars_1 = require("../util/env.vars");
const MAX_SIZE = 2100000;
const s3 = new s3_1.default({
    region: env_vars_1.BUCKET_REGION,
    accessKeyId: env_vars_1.ACCESS_KEY_AWS,
    secretAccessKey: env_vars_1.SECRET_KEY_AWS,
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(new Error("Invalid Mime Type"), false);
    }
};
const multerS3Upload = multer_1.default({
    fileFilter: fileFilter,
    storage: multer_s3_1.default({
        s3: s3,
        bucket: env_vars_1.BUCKET_NAME,
        acl: "public-read-write",
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, uuid_1.v4() + "_" + file.originalname);
        },
    }),
    limits: { fileSize: MAX_SIZE },
}).single("profile_picture");
/* Middleware to export */
function goUpload(req, res, next) {
    multerS3Upload(req, res, function (err) {
        if (err) {
            return res.status(422).json({
                error: err.message,
                status_code: 422,
            });
        }
        next();
    });
}
exports.goUpload = goUpload;
//# sourceMappingURL=images.s3.js.map