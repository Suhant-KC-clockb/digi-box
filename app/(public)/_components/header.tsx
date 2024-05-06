import Logo from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ShiftingDropDown } from "./headers/drop-down";
import SearchBox from "./headers/search-box";
import { Ticket } from "lucide-react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="w-full sticky top-0 z-20 shadow-sm bg-white">
      <nav className="w-full flex justify-between items-center md:py-4">
        <div className="flex gap-4 items-center">
          <Link className="ml-28" href="/">
            <Logo></Logo>
          </Link>
        </div>

        <div className="flex gap-6 items-center">
          <ShiftingDropDown></ShiftingDropDown>
          <div className="relative">
            {/* <Ticket className="text-yello-500 absolute top-0"></Ticket> */}
            <Link href={"#"}>Short Course</Link>
          </div>

          <Link href={"#"}>Offers</Link>
          <Link href={"#"}>Testimonials</Link>
          <Link href={"#"}>Blog</Link>
        </div>
        <SearchBox></SearchBox>
        <div className="hidden sm:hidden  lg:inline-block mr-28 ">
          <Link href="#">
            <Button className="rounded-3xl" variant={"default"}>
              Send Enquiry
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
