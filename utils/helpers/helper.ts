import minioClient from "@/lib/minioClient";
import axios from "axios";
import { NextResponse } from "next/server";
let Minio;
if (typeof window === "undefined") {
  Minio = require("minio");
}

export function successResponse(text: String, status?: number) {
  return NextResponse.json({ message: text }, { status: status ?? 201 });
}
export function errorResponse(text: String, status?: number) {
  return NextResponse.json({ error: text }, { status: status ?? 500 });
}
export function successGetReq(obj: any, status?: number) {
  return NextResponse.json(obj, { status: status ?? 200 });
}

export async function uploadToMinIO(image: File, folder: string) {
  let uploadedFileName = "";
  const fileData = new FormData();
  fileData.append("file", image);
  fileData.append("uploadType", folder);
  try {
    const minoResponse = await axios.post("/api/uploadtominio", fileData);
    if (minoResponse.status === 201) {
      uploadedFileName = minoResponse.data[0];
    } else {
    }
  } catch (error) {
    console.error("File upload failed:", error);
  }
  return uploadedFileName;
}

export async function deletefrombucket(objectName: string) {
  try {
    // const response = await minioClient.removeObject("clockb", objectName);
    await axios.post(`/api/deletefromminio?objectName=${objectName}`);
    return "success";
  } catch (error) {
    return "error";
  }
}
