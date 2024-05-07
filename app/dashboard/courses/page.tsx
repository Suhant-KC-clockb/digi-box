import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
import React from "react";
import CourseCard from "./_component/course-card";
import { Input } from "@/components/ui/input";
import CourseBody from "./_component/coures-body";

const Page = async () => {
  const courses = await db.course.findMany();
  return (
    <>
      <CourseBody courses={courses}></CourseBody>
    </>
  );
};

export default Page;
