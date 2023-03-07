import { Client } from "minio";
import config from "./config.js";

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
};

export const uploadFile = async (file, filePath) => {
  const finalFilePath = `${filePath}/${file.originalname}`;

  const uploadFile = await minioClient.putObject(
    bucketName,
    filePath,
    file.buffer
  );
  return uploadFile;
};

export const deleteFile = async (filePath) => {
  console.log(filePath);
  const deletedFile = await minioClient.removeObject(bucketName, filePath);

  return deletedFile;
};

export const getFile = async (filePath) => {
  const object = await minioClient.getObject(bucketName, filePath);
  return object;
};
