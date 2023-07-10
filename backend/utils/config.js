import dotenv from "dotenv";

dotenv.config();

const config = {
  mongoUrl: process.env.MONGODB_URI ?? "mongodb://localhost:27017/reader",
  minioEndPoint: process.env.MINIO_ENDPOINT ?? "localhost",
  minioPort: Number(process.env.MINIO_PORT) ?? 9000,
  minioBucketPrefix: process.env.MINIO_BUCKET_PREFIX ?? "reader",
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY ?? "reader",
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY ?? "readerPassword",
  allowedFiles: ["image/jpeg", "image/png"],
  port: Number(process.env.PORT) ?? 3001,
  tokenSecret: process.env.SECRET ?? "secret",
  useSSL: process.env.USE_SSL === "true" ?? false,
  adminUserName: process.env.ADMIN_USER_NAME,
  adminUserPassword: process.env.ADMIN_USER_PASSWORD,
};

export default config;
