import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { paths } from "@/lib/paths";
import Section1Body from "./_component/section1-body";
import { db } from "@/lib/db";

type Props = {
  params: { [key: string]: string };
};

const Page = async (props: Props) => {
  const sectionList = await db.landingSection1.findMany();

  return (
    <>
      <div className="flex flex-col gap-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={paths.dashboard.home}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={paths.dashboard.siteSetting}>
                Site Setting
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={paths.dashboard.siteSetting + "/landing-page"}
              >
                Landing
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Section 1</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Section1Body sectionList={sectionList}></Section1Body>
    </>
  );
};

export default Page;
