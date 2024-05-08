"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { CourseSchema } from "@/actions/course/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import CurriculumSection from "./curriculum-section";
import { useActions } from "@/hooks/use-action";
import { createCourse, editCourse } from "@/actions/course";
import { toast } from "sonner";
import { CourseCategory, Course } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, TrashIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import AddNewCategory from "./add-new-category";
import { deleteCourseCat } from "@/actions/course-category";
import { LoadingButton } from "@/components/ui/loading-button";
import { MINIOURL } from "@/constant/minio";
import { uploadToMinIO } from "@/utils/helpers/helper";
import ReactQuillEditor from "@/components/quill/react-quill-editor";

type Props = {
  categories: CourseCategory[];
  type: "add" | "edit";
  course?: Course | null;
  curriculum?: any;
};

const CourseForm = (props: Props) => {
  const [isOpen, setisOpen] = useState(false);
  const { execute: editExecute, isLoading: editLoading } = useActions(
    editCourse,
    {
      onSuccess: () => {
        toast.success(`Course Added Successfully`);
      },
      onError: (error) => {
        toast.error(error);
        console.error(error);
      },
    }
  );
  const { execute, isLoading } = useActions(createCourse, {
    onSuccess: () => {
      toast.success(`Course Added Successfully`);
    },
    onError: (error) => {
      toast.error(error);
      console.error(error);
    },
  });

  const form = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      courseBenefit: props.course?.courseBenefit ?? undefined,
      title: props.course?.title ?? "",
      description: props.course?.description ?? "",
      language: props.course?.language ?? "",
      previewURL: props.course?.previewUrl ?? "",
      price: props.course?.price.toString() ?? "",
      duration: props.course?.duration ?? "",
      category:
        props.course?.courseCategoryId ?? props.categories.length == undefined
          ? props.categories[0].id
          : "",
      image: props.course?.image ? `${MINIOURL}/${props.course?.image}` : null,

      curriculum: props.curriculum ?? [],
    },
  });
  const onSubmit = async (values: z.infer<typeof CourseSchema>) => {
    if (props.type == "add") {
      let courseImageUrl;
      if (values.image) {
        courseImageUrl = await uploadToMinIO(values.image, "course");
      }
      execute({
        ...values,
        image: courseImageUrl,
      });
    } else {
      let courseImageUrl = null;
      if (values.image != `${MINIOURL}/${props.course?.image}`) {
        courseImageUrl = await uploadToMinIO(values.image, "course");
      }
      editExecute({
        id: props.course?.id,
        ...values,
        image: courseImageUrl ?? props.course?.image,
      });
    }
  };

  const onAddCategoryClick = () => {
    setisOpen(true);
  };

  const handleCategoryDelete = async (id: string) => {
    try {
      const response = await deleteCourseCat(
        id,
        props.type == "add"
          ? "/dashboard/course/add"
          : `dashboard/course/edit?id=${props.course?.id}`
      );

      if (response.message) {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Dialog open={isOpen} onOpenChange={() => setisOpen(false)}>
          <DialogContent className="">
            <DialogHeader>
              <AddNewCategory></AddNewCategory>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <div className="flex gap-4">
          <div className="bg-secondary p-6 rounded-lg  flex flex-col gap-y-4 w-1/2">
            <div className="text-2xl font-semibold">Course Detail</div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Eg: DevOps in 100 Days" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="relative flex items-center justify-start ">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className=" w-[15rem]">
                    <FormLabel className="">Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {props.categories.map((element, index) => (
                          <div key={index} className="flex gap-x-2">
                            <SelectItem value={element.id}>
                              {element.title}
                            </SelectItem>
                            <TrashIcon
                              className="text-red-500 hover:text-red-800 cursor-pointer duration-300"
                              onClick={() => handleCategoryDelete(element.id)}
                            />
                          </div>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                className="absolute top-10 left-72"
                onClick={onAddCategoryClick}
              >
                <Plus></Plus>
              </div>
            </div>
            <FormField
              control={form.control}
              name="previewURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preview URL</FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      placeholder="Place a YT Link here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input className="" placeholder="Eg: 300 hr" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input className="" placeholder="Eg: English" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className=""
                      placeholder="Price are in NPR"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="bg-secondary p-6 rounded-lg  flex flex-col gap-y-4 w-1/2">
            <div className="text-2xl font-semibold">
              Course Description & Image
            </div>
            <SCNSingleImagePicker
              name="Course Image"
              schemaName="image"
              variant="imageBox"
            />
            <ReactQuillEditor
              name={"description"}
              label={"Description"}
            ></ReactQuillEditor>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-secondary p-6 rounded-lg  flex flex-col gap-y-4 w-1/2">
            <div className="text-2xl font-semibold">Course Benefits</div>
            <ReactQuillEditor
              name={"courseBenefit"}
              label={"Course Benefit"}
            ></ReactQuillEditor>
          </div>
          <CurriculumSection />
        </div>
        <div className="flex justify-end">
          <LoadingButton loading={form.formState.isSubmitting} type="submit">
            Save
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default CourseForm;
