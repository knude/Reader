import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT ?? 3001,

  mongoUrl: process.env.MONGODB_URI ?? "mongodb://localhost:27017/reader",
  minioEndPoint: process.env.MINIO_ENDPOINT ?? "localhost",
  minioPort: process.env.MINIO_PORT ?? 9000,
  minioBucketPrefix: process.env.MINIO_BUCKET_PREFIX ?? "reader",
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY ?? "reader",
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY ?? "readerPassword",
  allowedFiles: ["image/jpeg", "image/png"],
};

export default config;
