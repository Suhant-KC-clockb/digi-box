"use client";
import {
  Section1Schema,
  container1Schema,
  container2Schema,
} from "@/actions/landing-page-config/section-1/schema";
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import SCNMultiImagePicker from "@/components/image-picker/multi-image-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { LandingSection1, Section1ContainerType } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  landingSection?: LandingSection1 | undefined | null;
};

export const Container3Card = ({}: Props) => {
  const form = useForm<z.infer<typeof container2Schema>>({
    resolver: zodResolver(Section1Schema),
    defaultValues: {
      type: Section1ContainerType.Container3,
    },
  });

  const onSubmit = async (values: z.infer<typeof container2Schema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-4">
          <div className="bg-secondary p-6 rounded-lg  flex flex-col gap-y-4 w-full">
            <div className="text-2xl font-semibold">Container 3</div>
            <SCNSingleImagePicker
              name="Course Image"
              variant="imageBox"
              schemaName="image"
            />
            <FormField
              control={form.control}
              name="redirectUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Redirect URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Redirect Url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton loading={form.formState.isSubmitting} type="submit">
              Save
            </LoadingButton>
          </div>
        </div>
      </form>
    </Form>
  );
};
