import { Section1ContainerType } from "@prisma/client";
import { z } from "zod";

export const Section1Schema = z.object({
  redirectUrl: z.string().optional(),
  images: z.any(),
  image: z.any(),
  type: z.nativeEnum(Section1ContainerType),
  count: z.string().optional(),
});

export const container1Schema = z.object({
  redirectUrl: z.string().url(),
  images: z
    .any()
    .refine(
      (val) => typeof val === "string" || val instanceof File,
      "Please select an image"
    )
    .array()
    .nonempty({
      message: "Can't be empty!",
    })
    .max(4, "Cannot be more than 4 images"),
  type: z.nativeEnum(Section1ContainerType),
});

export const container2Schema = z.object({
  redirectUrl: z.string().url(),
  image: z
    .any()
    .refine(
      (val) => typeof val === "string" || val instanceof File,
      "Please select an image"
    ),
  type: z.nativeEnum(Section1ContainerType),
});
