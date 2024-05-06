"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { BiCategory } from "react-icons/bi";

type Props = {};

const SearchBox = (props: Props) => {
  const [searchText, setSearchText] = React.useState<string | null>(null);

  return (
    <div className=" px-4 flex items-center justify-start border rounded-3xl ">
      <Button variant={"ghost"} className="rounded-l-3xl border-r flex gap-2 ">
        <BiCategory size={18} className="text-primary" />
        <p>Categories</p>
      </Button>
      <Input
        placeholder="Search for Course..."
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        className="border-none bg-white"
      ></Input>
    </div>
  );
};

export default SearchBox;
