import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { paths } from "@/lib/paths";
import Link from "next/link";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const siteConfigList = [
    {
      name: "Landing Page",
      slug: "landing-page",
    },
    {
      name: "Footer",
      slug: "footer",
    },
    {
      name: "Testimonials",
      slug: "testimonials",
    },
    {
      name: "Success Stories",
      slug: "success-stories",
    },
  ];
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
              <BreadcrumbPage>Site Setting</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="my-5 grid grid-cols-3 gap-4">
        {siteConfigList.map((element, index) => (
          <Link
            href={paths.dashboard.siteSetting + `/${element.slug}`}
            className="border p-4 rounded-lg hover:bg-secondary duration-300 cursor-pointer"
            key={index}
          >
            {element.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Page;
