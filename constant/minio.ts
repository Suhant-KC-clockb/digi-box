export const bucketName: string =
  process.env.NODE_ENV == "production" ? "clockb" : "test";

export const MINIOURL =
  process.env.NODE_ENV == "production"
    ? `https://minio.nepalb.com/clockb/`
    : "https://minio.nepalb.com/test/";
