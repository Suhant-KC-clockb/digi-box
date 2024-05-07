"use client";
import React from "react";
import SectionOneCard from "./section-one-card";
import { Book, Briefcase, Clock, PersonStanding } from "lucide-react";

type Props = {};

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
    <div className="container my-10">
      <div className=" flex gap-x-4 w-full justify-evenly items-start ">
        <div className="w-full">
          <SectionOneCard />
        </div>
        <div className="flex flex-col gap-4 w-full ">
          <SectionOneCard />
          <SectionOneCard />
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
