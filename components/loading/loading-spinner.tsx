"use client";
import React from "react";
import { Triangle } from "react-loader-spinner";
type Props = {};

const LoadingSpinner = (props: Props) => {
  return (
    <Triangle
      visible={true}
      height="80"
      width="80"
      color="#ffffff"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default LoadingSpinner;
