"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Book, BookCheck, User } from "lucide-react";
import { SidebarItem } from "@/components/side-bar/side-bar-item";

type Props = {};

const guestRoutes = [
  {
    icon: Book,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: User,
    label: "Profile",
    href: "/dashboard/profile",
  },

  {
    icon: BookCheck,
    label: "Certificate",
    href: "/dashboard/certificate",
  },
];
const Sidebar = (props: Props) => {
  return (
    <>
      <Link className="p-4" href="/">
        <img className="w-auto h-32" src="images/logo/logo.svg" alt={""} />
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
