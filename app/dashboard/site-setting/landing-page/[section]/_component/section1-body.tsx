import { LandingSection1, Section1ContainerType } from "@prisma/client";
import React from "react";
import { Container1Card } from "./container-1-card";
import { Container2Card } from "./container-2-card";
import { Container3Card } from "./container-3-card";
import { db } from "@/lib/db";

type Props = {
  sectionList: LandingSection1[];
};

const Section1Body = ({ sectionList }: Props) => {
  return (
    <div className="my-10 grid grid-cols-2 gap-4">
      <Container1Card
        landingSection={sectionList.find(
          (element) => element.type == Section1ContainerType.Container1
        )}
      ></Container1Card>
      <Container2Card></Container2Card>
      <Container3Card></Container3Card>
    </div>
  );
};

export default Section1Body;
