import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CourseSchema } from "@/actions/course/schema";
import { z } from "zod";
import { Plus, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  index: number;
};

const LessonSection = (props: Props) => {
  const { control, getValues } = useFormContext<z.infer<typeof CourseSchema>>();

  const { fields, append, remove } = useFieldArray<
    z.infer<typeof CourseSchema>
  >({
    control,
    name: `curriculum.${props.index}.lesson`,
  });

  const handleAdd = () => {
    append({
      title: "",
      videoUrl: "",
    });
  };
  const handleRemove = (index: number) => {
    remove(index);
  };
  return (
    <div className="ml-10 mt-5">
      <div className="flex justify-end">
        <Button type="button" onClick={handleAdd}>
          Add New Lesson
        </Button>
      </div>
      {fields.map((item, index) => (
        <div key={index} className="flex flex-col my-4 gap-y-5">
          <div className="flex justify-between items-center text-xl font-semibold">
            {index + 1}. Lesson{" "}
            <Trash
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-900 duration-200 cursor-pointer "
              size={16}
            />
          </div>
          <FormField
            key={index}
            control={control}
            name={`curriculum.${props.index}.lesson.${index}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{index + 1}. Title</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key={index}
            control={control}
            name={`curriculum.${props.index}.lesson.${index}.videoUrl`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{index + 1}. Video URL</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default LessonSection;
