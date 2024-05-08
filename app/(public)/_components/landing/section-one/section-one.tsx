"use client";
import React from "react";
import SectionOneCard from "./section-one-card";
import { Book, Briefcase, Clock, PersonStanding } from "lucide-react";
import { LandingSection1, Section1ContainerType } from "@prisma/client";

type Props = {
  section1: LandingSection1[];
};

const SectionOne = (props: Props) => {
  const data = [
    { title: "Unique Courses", value: 15 },
    { title: "Industry Partners", value: 50 },
    { title: "Job Placement", value: 500 },
    { title: "Years Experience", value: 10 },
  ];

  const icons = [Book, PersonStanding, Briefcase, Clock];
  const colors = ["blue", "orange", "green", "red"];

  return (
    <div className="container my-20">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <SectionOneCard
            container={props.section1.find(
              (element) => element.type === Section1ContainerType.Container1
            )}
            type="single"
          ></SectionOneCard>
        </div>
        <div className="flex flex-col ">
          <SectionOneCard type="single"></SectionOneCard>
          <div className="h-2"></div>
          <SectionOneCard type="single"></SectionOneCard>
        </div>
      </div>

      <div className="my-5 grid grid-cols-2 xl:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="border bg-white p-4 rounded-lg flex items-center gap-x-6 "
          >
            <div
              style={{ color: colors[index] }} // Apply text color
            >
              {React.createElement(icons[index], { size: 38 })}{" "}
            </div>
            <div className="flex flex-col">
              <div className="font-semibold text-2xl">{item.value}+</div>
              <div className="text-gray-500">{item.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionOne;
