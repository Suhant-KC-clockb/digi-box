export const bucketName: string =
  process.env.NODE_ENV == "production" ? "digibox" : "test_digi";

export const MINIOURL =
  process.env.NODE_ENV == "production"
    ? `https://minio.nepalb.com/digibox/`
    : "https://minio.nepalb.com/test_digi/";
