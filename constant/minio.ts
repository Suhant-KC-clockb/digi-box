export const bucketName: string =
  process.env.NODE_ENV == "development" ? "test-digi" : "digibox";

export const MINIOURL = `https://minio.nepalb.com/${bucketName}/`;
