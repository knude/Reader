import { Client } from "minio";
import config from "./config.js";
import mime from "mime-types";

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

export const uploadFile = async (files, filePath) => {
  const uploadPromises = files.map(async (file) => {
    const finalFilePath = `${filePath}/${file.originalname}`;
    const uploadFile = await minioClient.putObject(
      bucketName,
      finalFilePath,
      file.buffer
    );
    return uploadFile;
  });

  const uploadResults = await Promise.all(uploadPromises);
  return uploadResults;
};

/* const createMultiple = async (series, chapter, files) => {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("files[]", files[i]);
  }

  formData.append("series", series);
  formData.append("chapter", chapter);

  const response = await axios.post(`${baseUrl}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}; */

export const deleteFile = async (filePath) => {
  await minioClient.removeObject(bucketName, filePath);
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
