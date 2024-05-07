"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CourseCatSchema } from "@/actions/course-category/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActions } from "@/hooks/use-action";
import { createCourseCategory } from "@/actions/course-category";
import { toast } from "sonner";
import { LoadingButton } from "@/components/ui/loading-button";
type Props = {};

const AddNewCategory = (props: Props) => {
  const { execute, isLoading } = useActions(createCourseCategory, {
    onSuccess: () => {
      toast.success(`New Category Added`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const form = useForm<z.infer<typeof CourseCatSchema>>();

  const onSubmit = (data: z.infer<typeof CourseCatSchema>) => {
    execute(data);
  };
  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Title</FormLabel>
              <FormControl>
                <Input placeholder="DevOps" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <LoadingButton
            loading={form.formState.isSubmitting}
            type="button"
            onClick={form.handleSubmit(onSubmit)}
          >
            Save
          </LoadingButton>
        </div>
      </Form>
    </div>
  );
};

export default AddNewCategory;
