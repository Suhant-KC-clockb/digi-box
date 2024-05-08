"use client";
import LoadingSpinner from "@/components/loading/loading-spinner";
import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <LoadingSpinner></LoadingSpinner>
    </div>
  );
};

export default Loading;
