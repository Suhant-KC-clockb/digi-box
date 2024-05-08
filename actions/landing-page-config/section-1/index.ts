"use server";

import { z } from "zod";
import { container1Schema, container2Schema } from "./schema";
import { db } from "@/lib/db";
import minioClient from "@/lib/minioClient";
import { bucketName } from "@/constant/minio";
import { revalidatePath } from "next/cache";

export const addUpdateLandingSection1Container1 = async (
  data: z.infer<typeof container1Schema>
) => {
  try {
    console.log(data);
    //Find Existing Container
    const existingContainer = await db.landingSection1.findFirst({
      where: {
        type: data.type,
      },
    });

    if (existingContainer) {
      const newContainer = await db.landingSection1.update({
        where: {
          id: existingContainer.id,
        },
        data: {
          type: data.type,
          images: data.images,
          redirectUrl: data.redirectUrl,
        },
      });

      const removedImages = existingContainer.images.filter(
        (item) => !data.images.includes(item)
      );

      await Promise.all(
        removedImages.map(async (image) => {
          await minioClient.removeObject(bucketName, image);
        })
      );
    } else {
      //Create new Container
      const newContainer = await db.landingSection1.create({
        data: {
          type: data.type,
          images: data.images,
          redirectUrl: data.redirectUrl,
        },
      });
    }
  } catch (error) {
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/dashboard/site-setting/landing-page/section1");
  }
};

export const addupdateSection1Container2 = async (
  data: z.infer<typeof container2Schema>
) => {
  try {
    const existingContainer = await db.landingSection1.findFirst({
      where: {
        type: data.type,
      },
    });

    if (existingContainer) {
      //Update existing container

      const updateContainer = await db.landingSection1.update({
        where: {
          id: existingContainer.id,
        },
        data: {
          image: data.image,
          redirectUrl: data.redirectUrl,
        },
      });

      if (data.image != existingContainer.image) {
        await minioClient.removeObject(bucketName, existingContainer.image!);
      }
    } else {
      //Create new Container

      const newContainer = await db.landingSection1.create({
        data: {
          type: data.type,
          image: data.image,
          redirectUrl: data.redirectUrl,
        },
      });
    }
  } catch (error) {}
};
