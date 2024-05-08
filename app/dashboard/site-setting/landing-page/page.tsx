import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { paths } from "@/lib/paths";
import { Book } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const Page = (props: Props) => {
  const sectionList = [
    {
      icon: Book,
      title: "Section 1",
      slug: "section1",
    },
    { icon: Book, title: "Section 2", slug: "section2" },
    { icon: Book, title: "Section 3", slug: "section3" },
    { icon: Book, title: "Section 4", slug: "section4" },
  ];

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
              <BreadcrumbPage>Landing</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="my-5 grid grid-cols-3 gap-4">
        {sectionList.map((element, index) => (
          <Link
            href={
              paths.dashboard.siteSetting + "/landing-page" + `/${element.slug}`
            }
            className="border p-4 rounded-lg hover:bg-secondary duration-300 cursor-pointer flex gap-4 items-center"
            key={index}
          >
            {React.createElement(element.icon, { size: 30 })} {element.title}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Page;
