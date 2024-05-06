import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HeaderDropDownMenu } from "./header-drop-down-menu";

const DashboardHeader = () => {
  return (
    <>
      <div className="fixed top-0 w-full h-16 bg-secondary border flex items-center justify-end">
        <div className="flex md:hidden">
          <Link href="/">
            <Image src="/logo/nss-logo.png" width={150} height={150} alt={""} />
          </Link>
        </div>
        <div className="flex gap-x-2 items-center">
          <HeaderDropDownMenu></HeaderDropDownMenu>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
