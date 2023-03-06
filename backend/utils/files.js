import { Client } from "minio";
import config from "./config.js";
import fs from "fs";

const baseUrl = `http://${config.endPoint}:${config.port}`;

const bucketName = `${config.minioBucketPrefix}-series`;
const bucketUrl = `${baseUrl}/${bucketName}`;

const minioClient = new Client({
  endPoint: config.minioEndPoint,
  port: config.minioPort,
  accessKey: config.MINIO_ACCESS_KEY,
  secretKey: config.MINIO_SECRET_KEY,
  useSSL: false,
});

export const initializeBucket = async () => {
  if (!(await minioClient.bucketExists(bucketName))) {
    await minioClient.makeBucket(bucketName);
    console.log(`Created new bucket ${bucketName}`);
  }

  minioClient.setBucketPolicy(bucketName, {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Deny",
        Principal: "*",
        Action: "s3:PutObject",
        Resource: `arn:aws:s3:::${bucketName}/*`,
        Condition: {
          StringNotLike: {
            "s3:x-amz-meta-filetype": config.allowedFiles,
          },
        },
      },
    ],
  });
};

export const uploadFile = async (file, filePath) => {
  const filePath = `images/${file.originalname}`;

  await minioClient.putObject(config.minioBucket, filePath, file.buffer);

  res.status(200).json({
    message: "File uploaded successfully",
    url: `${config.baseUrl}/${config.minioBucket}/${filePath}`,
  });
};

export const deleteFile = async (filePath) => {
  const filePath = `images/${file.originalname}`;

  minioClient.removeObject(filePath);

  res.status(200).json({
    message: "File deleted successfully",
    url: `${config.baseUrl}/${config.minioBucket}/${filePath}`,
  });
};
