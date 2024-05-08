"use client";
import { deleteCourse } from "@/actions/course";
import { Course } from "@prisma/client";
import React from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";
import { MINIOURL } from "@/constant/minio";
import { paths } from "@/lib/paths";
type Props = {
  course: Course;
};

const CourseCard = ({ course }: Props) => {
  const onDeletePressed = async () => {
    const response = await deleteCourse(course.id);

    if (response) {
      toast.success("Course Deleted");
    } else {
      toast.error("Course not deleted");
    }
  };
  return (
    <div className="relative flex flex-col rounded-lg bg-secondary p-4 gap-4">
      <div className="flex items-end justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu size={18}></Menu>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={paths.dashboard.courses + `/edit?id=${course.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={onDeletePressed}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <img
        className="w-full h-48 object-cover rounded-md"
        src={`${MINIOURL}/${course.image}`}
      ></img>
      <p className="text-lg font-semibold">{course.title}</p>
    </div>
  );
};

export default CourseCard;
