"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  BarChart,
  Book,
  BookCheck,
  Computer,
  Settings,
  User,
} from "lucide-react";
import { SidebarItem } from "@/components/side-bar/side-bar-item";
import { paths } from "@/lib/paths";

type Props = {};

const guestRoutes = [
  {
    icon: BarChart,
    label: "Dashboard",
    href: paths.dashboard.home,
  },
  {
    icon: Book,
    label: "Courses",
    href: paths.dashboard.courses,
  },
  {
    icon: Settings,
    label: "Site Setting",
    href: paths.dashboard.siteSetting,
  },
];
const Sidebar = (props: Props) => {
  return (
    <>
      <Link className="p-4" href="/">
        <img className="w-auto h-32" src="/images/logo/logo.svg" alt={""} />
      </Link>
      <div className="flex flex-col w-full">
        {guestRoutes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      </div>
    </>
  );
};

export default Sidebar;
