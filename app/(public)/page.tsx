import React from "react";
import SectionOne from "./_components/landing/section-one/section-one";
import { db } from "@/lib/db";

type Props = {};

const Page = async (props: Props) => {
  const section1 = await db.landingSection1.findMany();

  return (
    <div className="my-10">
      <SectionOne section1={section1}></SectionOne>
    </div>
  );
};

export default Page;
