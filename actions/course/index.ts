"use server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { CourseSchema } from "./schema";
import { uplodFileToMinio } from "@/utils/upload-file-to-minio";
import { createSlug } from "@/utils/create-slug";
import { Curriculum } from "@prisma/client";
import { bucketName } from "@/constant/minio";
import minioClient from "@/lib/minioClient";

const createHandler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  let slug = createSlug(data.title);

  // Check if the initial slug is available
  let existingSlugCheck = await db.course.findFirst({
    where: {
      slug: slug,
    },
  });

  // If the initial slug is not available, append a counter until a unique slug is found
  let counter = 1;
  while (existingSlugCheck) {
    slug = createSlug(data.title + ` ${counter}`);
    existingSlugCheck = await db.course.findFirst({
      where: {
        slug: slug,
      },
    });
    counter++;
  }
  const createdCourse = await db.course.create({
    data: {
      title: data.title,
      duration: data.duration,
      description: data.description,
      courseBenefit: data.courseBenefit,
      slug: slug,
      image: data.image ?? "",
      language: data.language,
      previewUrl: data.previewURL ?? "",
      price: parseInt(data.price) ?? 0,
      category: {
        connect: { id: data.category },
      },
    },
  });

  const curriculumPromises = data.curriculum.map(async (curriculumItem) => {
    const createdCurriculum = await db.curriculum.create({
      data: {
        section: curriculumItem.section,
        Course: { connect: { id: createdCourse.id } },
        lesson: {
          createMany: {
            data: curriculumItem.lesson.map((lesson) => ({
              title: lesson.title,
              videoUrl: lesson.videoUrl,
            })),
          },
        },
      },
      include: { lesson: true },
    });
    return createdCurriculum;
  });
  revalidatePath("/dashboard/course");
  redirect("/dashboard/course");
};

const editHandler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const editedCourse = await db.course.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      duration: data.duration,
      description: data.description,
      image: data.image ?? "",
      language: data.language,
      previewUrl: data.previewURL ?? "",
      price: parseInt(data.price) ?? 0,
      category: {
        connect: { id: data.category },
      },
    },
    include: {
      curriculum: {
        include: {
          lesson: true,
        },
      },
    },
  });

  const existingCurriculumIds = editedCourse.curriculum.map(
    (curriculum) => curriculum.id
  );
  const newCurriculumIds = data.curriculum.map(
    (curriculumItem) => curriculumItem.id
  );

  // Find removed curriculum
  const removedCurriculumIds = existingCurriculumIds.filter(
    (id) => !newCurriculumIds.includes(id)
  );

  // Delete removed curriculum and associated lessons
  await Promise.all(
    removedCurriculumIds.map(async (curriculumId) => {
      await db.lesson.deleteMany({
        where: { curriculumId }, // Delete associated lessons
      });
      await db.curriculum.delete({
        where: { id: curriculumId },
      });
    })
  );

  const curriculumPromises = data.curriculum.map(async (curriculumItem) => {
    if (curriculumItem.id) {
      // Update existing curriculum
      await db.curriculum.update({
        where: { id: curriculumItem.id },
        data: { section: curriculumItem.section },
      });
    } else {
      // Create new curriculum
      const createdCurriculum = await db.curriculum.create({
        data: {
          section: curriculumItem.section,
          Course: { connect: { id: editedCourse.id } },
          lesson: {
            createMany: {
              data:
                curriculumItem.lesson?.map((lesson) => ({
                  title: lesson.title,
                  videoUrl: lesson.videoUrl,
                })) ?? [],
            },
          },
        },
        include: { lesson: true },
      });
      return createdCurriculum;
    }

    // Update or create lessons
    const lessonPromises = (curriculumItem.lesson ?? []).map(
      async (lessonItem) => {
        if (lessonItem.id) {
          // Update existing lesson
          await db.lesson.update({
            where: { id: lessonItem.id },
            data: { title: lessonItem.title, videoUrl: lessonItem.videoUrl },
          });
        } else {
          // Create new lesson
          await db.lesson.create({
            data: {
              title: lessonItem.title,
              videoUrl: lessonItem.videoUrl,
              Curriculum: { connect: { id: curriculumItem.id } },
            },
          });
        }
      }
    );

    // Wait for all lesson updates or creations to complete
    await Promise.all(lessonPromises);

    // Delete lessons that are not present in the new curriculum
    const existingLessonIds = (curriculumItem.lesson ?? []).map(
      (lesson) => lesson.id
    );

    const currentCurr = editedCourse.curriculum
      .find((c) => c.id == curriculumItem.id)
      ?.lesson.map((l) => l.id);

    const removedLessonsIdFromCurrCurriculum = currentCurr?.filter(
      (c) => !existingLessonIds.includes(c)
    );

    if (
      removedLessonsIdFromCurrCurriculum &&
      removedLessonsIdFromCurrCurriculum.length > 0
    ) {
      await Promise.all(
        removedLessonsIdFromCurrCurriculum.map(async (lessonId) => {
          await db.lesson.delete({
            where: { id: lessonId },
          });
        })
      );
    }
  });

  // Perform any additional actions after updating/creating curriculum and lessons (if needed)
  revalidatePath("/dashboard/course");
  redirect("/dashboard/course");
};

export const deleteCourse = async (id: string) => {
  try {
    const checkExistingCourse = await db.course.findFirst({
      where: {
        id,
      },
    });

    if (!checkExistingCourse) {
      return false;
    }

    await minioClient.removeObject(bucketName, checkExistingCourse.image);

    await db.course.delete({
      where: { id },
      include: {
        curriculum: true,
      },
    });

    revalidatePath("/dashboard/course");
    return true;
  } catch (error) {
    return false;
  }
};

export const createCourse = createSafeAction(CourseSchema, createHandler);
export const editCourse = createSafeAction(CourseSchema, editHandler);
