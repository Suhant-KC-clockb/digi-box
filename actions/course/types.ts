import { z } from "zod";
import { Course } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CourseSchema } from "./schema";

export type InputType = z.infer<typeof CourseSchema>;
export type ReturnType = ActionState<InputType, Course>;
