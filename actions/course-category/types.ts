import { z } from "zod";
import { CourseCategory } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CourseCatSchema } from "./schema";

export type InputType = z.infer<typeof CourseCatSchema>;
export type ReturnType = ActionState<InputType, CourseCategory>;
