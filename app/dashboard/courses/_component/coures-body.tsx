"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import CourseCard from "./course-card";
import { motion } from "framer-motion";
import { Course } from "@prisma/client";
import { paths } from "@/lib/paths";
type Props = {
  courses: Course[];
};

const CourseBody = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter courses based on search query
  const filteredCourses = props.courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
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
              <BreadcrumbPage>Courses</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className=" flex items-start justify-between ">
          <div className="text-2xl font-semibold">Courses</div>
          <div className="flex gap-x-4">
            <Input
              className="text-black"
              placeholder="Search course"
              onChange={(e) => setSearchQuery(e.target.value)}
            ></Input>
            <Link href={paths.dashboard.courses + "/add"}>
              <Button>Add Course</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid  md:grid-cols-3 2xl:grid-cols-4 my-10 gap-4">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CourseCard key={index} course={course}></CourseCard>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default CourseBody;
