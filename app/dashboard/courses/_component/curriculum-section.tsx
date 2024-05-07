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
import LessonSection from "./lesson-section";
import { Button } from "@/components/ui/button";
type Props = {};

const CurriculumSection = (props: Props) => {
  const { control, getValues } = useFormContext<z.infer<typeof CourseSchema>>();

  const { fields, append, remove } = useFieldArray<
    z.infer<typeof CourseSchema>
  >({
    control,
    name: "curriculum",
  });

  const handleAdd = () => {
    append({
      section: "",
    });
  };
  const handleRemove = (index: number) => {
    remove(index);
  };
  return (
    <div className="bg-secondary p-6 rounded-lg  flex flex-col gap-y-4 w-1/2">
      <div className="flex w-full justify-between items-center">
        <div className="text-2xl font-semibold">Curriculum Detail</div>

        <div className="flex justify-end">
          <Button type="button" onClick={handleAdd}>
            Add New Curriculum
          </Button>
        </div>
      </div>
      {fields.map((item, index) => (
        <div key={index} className="flex flex-col">
          <FormField
            key={index}
            control={control}
            name={`curriculum.${index}.section`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between items-center text-xl font-semibold">
                  {index + 1}. Section
                  <Trash
                    onClick={() => handleRemove(index)}
                    className="text-red-500 hover:text-red-900 duration-200 cursor-pointer "
                    size={16}
                  />
                </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <LessonSection index={index} />
        </div>
      ))}
    </div>
  );
};

export default CurriculumSection;
