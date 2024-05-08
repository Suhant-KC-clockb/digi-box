import { z } from "zod";

const socialLink = z.object({
  facebook: z.string().url().min(1, "Facebook URL is required"),
  twitter: z.string().url().min(1, "Twitter URL is required"),
  linkedIn: z.string().url().min(1, "LinkedIn URL is required"),
});

const lessonSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  videoUrl: z.string().url().min(1, "Video URL is required"),
});

const curriculumSchema = z.object({
  id: z.string().optional(),
  section: z.string().min(1, "Section is required"),
  lesson: z.array(lessonSchema),
});

export const CourseSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  language: z.string().min(1, "Language is required"),
  category: z.string().min(1, "Category is required"),
  image: z.any(),
  previewURL: z.string().url().min(1, "Preview URL is required"),
  price: z.string().min(1, "Price is required"),
  duration: z.string(),
  courseBenefit: z.string().optional(),
  curriculum: z.array(curriculumSchema),
  status: z.boolean().optional(),
});
