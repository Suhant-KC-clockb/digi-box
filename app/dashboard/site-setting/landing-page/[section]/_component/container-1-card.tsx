"use client";
import { addUpdateLandingSection1Container1 } from "@/actions/landing-page-config/section-1";
import {
  Section1Schema,
  container1Schema,
} from "@/actions/landing-page-config/section-1/schema";
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
import { MINIOURL, bucketName } from "@/constant/minio";
import { uploadToMinIO } from "@/utils/helpers/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { LandingSection1, Section1ContainerType } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  landingSection?: LandingSection1 | undefined | null;
};

export const Container1Card = ({ landingSection }: Props) => {
  const form = useForm<z.infer<typeof container1Schema>>({
    resolver: zodResolver(Section1Schema),
    defaultValues: {
      type: Section1ContainerType.Container1,
      redirectUrl: landingSection?.redirectUrl ?? undefined,
      images:
        landingSection && landingSection.images.length > 0
          ? landingSection?.images.map((image) => `${MINIOURL}${image}`)
          : [],
    },
  });

  const onSubmit = async (values: z.infer<typeof container1Schema>) => {
    const imageList: string[] = [];

    await Promise.all(
      values.images.map(async (imageBuffer, index) => {
        if (typeof imageBuffer === "string") {
          // imageList.push(imageBuffer);
          console.log(imageBuffer);
        } else {
          const image = await uploadToMinIO(imageBuffer, "section1");
          imageList.push(image);
        }
      })
    );

    const result = await addUpdateLandingSection1Container1({
      ...values,

      //@ts-ignore
      images: imageList.length == 0 ? landingSection?.images : imageList,
    });

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Updated successfully");
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-4">
          <div className="bg-secondary p-6 rounded-lg  flex flex-col gap-y-4 w-full">
            <div className="text-2xl font-semibold">Container 1</div>
            <SCNMultiImagePicker
              name="Course Image"
              schemaName="images"
              limit={4}
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
