import HtmlBody from "@/components/html-body/html-body";
import { db } from "@/lib/db";
import React from "react";

type Props = {};

const Page = async (props: Props) => {
  const courses = await db.course.findFirst();
  return (
    <div className="container h-[60vh]">
      {courses && courses.description && (
        <HtmlBody body={courses?.description} />
      )}
    </div>
  );
};

export default Page;
