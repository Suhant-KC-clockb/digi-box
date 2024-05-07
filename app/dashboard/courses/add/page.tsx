import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import CourseForm from "../_component/course-form";
import { db } from "@/lib/db";
import { paths } from "@/lib/paths";

const Page = async () => {
  const categories = await db.courseCategory.findMany();

  return (
    <>
      <div className="flex flex-col gap-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={paths.dashboard.courses}>
                Course
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add Course</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className=" flex items-start justify-between ">
          <div className="text-2xl font-semibold">Add Course</div>
        </div>
      </div>
      <CourseForm categories={categories} type={"add"}></CourseForm>
    </>
  );
};

export default Page;
