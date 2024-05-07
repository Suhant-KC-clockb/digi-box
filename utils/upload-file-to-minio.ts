// utils/minioHelper.ts
import minioClient from "@/lib/minioClient";
import path from "path";

interface UploadFileResponse {
  success: boolean;
  uploadedFileNames?: string;
  error?: string;
}

export async function uplodFileToMinio(
  uploadType: string,
  file: any
): Promise<UploadFileResponse> {
  try {
    const bucketName = process.env.MINIOBUCKET ?? "bgyan"; // Replace with your bucket name

    let uploadedFileNames;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueId = Date.now().toString();
    // const fileExtension = file.type.split('/')[1];
    const fileExtension = path.extname(file.name).slice(1);
    const filename = `${uploadType}_${uniqueId}.${fileExtension}`;

    const objectName = path.join(uploadType, filename);
    const contentType = file.type;
    // await minioClient.putObject(bucketName, objectName, buffer);
    await minioClient.putObject(bucketName, objectName, buffer, buffer.length, {
      "Content-Type": contentType,
    });

    uploadedFileNames = objectName;
    return { success: true, uploadedFileNames };
  } catch (error) {
    console.error("Error uploading file(s) to MinIO:", error);
    return { success: false, error: "Invalid request body" };
  }
}
