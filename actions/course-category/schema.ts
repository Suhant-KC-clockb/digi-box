import { z } from "zod";

export const CourseCatSchema = z.object({
  title: z.string().min(1, "Title is required"),
});
