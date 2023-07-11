import { Client } from "minio";
import config from "./config.js";
import mime from "mime-types";

const bucketName = `${config.minioBucketPrefix}-series`;

const minioClient = new Client({
  endPoint: config.minioEndPoint,
  port: config.minioPort,
  accessKey: config.MINIO_ACCESS_KEY,
  secretKey: config.MINIO_SECRET_KEY,
  useSSL: config.useSSL,
});

export const initializeBucket = async () => {
  try {
    const bucketExists = await minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      await minioClient.makeBucket(bucketName);
      console.log(`Created new bucket ${bucketName}`);
    }
    console.log(`Using bucket ${bucketName}`);
  } catch (error) {
    throw error;
  }
};

export const uploadFile = async (files, filePath) => {
  try {
    const allowedFiles = files.every((file) => {
      const fileExt = file.originalname.split(".").pop();
      const mimeType = mime.lookup(fileExt);
      return config.allowedFiles.includes(mimeType);
    });
    if (!allowedFiles) {
      return;
    }

    const uploadResults = [];

    for (const file of files) {
      const finalFilePath = `${filePath}/${file.originalname}`;
      const uploadFile = await minioClient.putObject(
        bucketName,
        finalFilePath,
        file.buffer
      );
      uploadResults.push(uploadFile);
    }

    return uploadResults;
  } catch (error) {
    for (const file of files) {
      minioClient.removeObject(bucketName, `${filePath}/${file.originalname}`);
    }
    throw error;
  }
};

export const deleteFile = async (filePath) => {
  return await minioClient.removeObject(bucketName, filePath);
};

export const getFile = async (filePath) => {
  const objects = minioClient.listObjectsV2(bucketName, filePath, true);

  const allowedObject = await objects.find((obj) => {
    const fileExt = obj.name.split(".").pop();
    const mimeType = mime.lookup(fileExt);
    return config.allowedFiles.includes(mimeType);
  });

  if (allowedObject) {
    return await minioClient.getObject(bucketName, allowedObject.name);
  }
};
