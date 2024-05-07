"use server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { CourseCatSchema } from "./schema";
import { createSlug } from "@/utils/create-slug";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  let slug = createSlug(data.title);

  // Check if the initial slug is available
  let existingSlugCheck = await db.courseCategory.findFirst({
    where: {
      slug: slug,
    },
  });

  // If the initial slug is not available, append a counter until a unique slug is found
  let counter = 1;
  while (existingSlugCheck) {
    slug = createSlug(data.title + ` ${counter}`);
    existingSlugCheck = await db.courseCategory.findFirst({
      where: {
        slug: slug,
      },
    });
    counter++;
  }

  const newCategory = await db.courseCategory.create({
    data: {
      slug: slug,
      ...data,
    },
  });

  revalidatePath("/dashboard/course/add");
  return { data: newCategory };
};

export const deleteCourseCat = async (id: string, url: string) => {
  try {
    const response = await db.courseCategory.delete({
      where: {
        id,
      },
    });
    revalidatePath(url);
    if (response) {
      return { message: "Deleted" };
    } else {
      return { error: "Could not delete course category" };
    }
  } catch (error) {
    return { error: "Could not delete course category" };
  }
};

export const createCourseCategory = createSafeAction(CourseCatSchema, handler);
