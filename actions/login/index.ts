"use server";
import { db } from "@/lib/db";
import { z } from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { LoginSchema } from "./schema";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_REDIRECT_URL } from "@/lib/paths";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validateState = LoginSchema.safeParse(values);
  if (!validateState) {
    return { error: "Invalid fields" };
  }
  const { email, password } = values;
  const exisitingUser = await getUserByEmail(email);
  if (!exisitingUser || !exisitingUser.email || !exisitingUser.password) {
    return { error: "Invalid credentials" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_REDIRECT_URL,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
