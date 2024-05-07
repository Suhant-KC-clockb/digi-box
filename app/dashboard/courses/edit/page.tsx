import { db } from "@/lib/db";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CourseForm from "../_component/course-form";
import { paths } from "@/lib/paths";

// app/posts/page.ts
type Props = {
  params: {};
  searchParams: { id: string };
};

export default async function Page(props: Props) {
  const searchParams = props.searchParams;

  const course = await db.course.findFirst({
    where: {
      id: searchParams.id,
    },
    include: {
      category: true, // Include the category
      curriculum: {
        include: {
          lesson: true,
        },
      },
    },
  });

  const categories = await db.courseCategory.findMany();
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
              <BreadcrumbLink href={paths.dashboard.courses}>
                Course
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit Course</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className=" flex items-start justify-between ">
          <div className="text-2xl font-semibold">Edit Course</div>
        </div>
      </div>

      <CourseForm
        course={course}
        categories={categories}
        curriculum={course?.curriculum}
        type={"edit"}
      />
    </>
  );
}
