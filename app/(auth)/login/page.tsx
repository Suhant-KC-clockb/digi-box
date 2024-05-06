import React from "react";
import LoginForm from "./_component/login-form";
import Logo from "@/components/logo/logo";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="flex gap-x-10 border p-10 rounded-lg">
      <div className="flex flex-col items-center justify-center  ">
        <img
          className="w-full h-36 "
          src="images/logo/logo.svg"
          alt="nss-logo-png"
        />
      </div>

      <div className="flex flex-col gap-y-10">
        <div className="font-semibold text-2xl">Login </div>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
};

export default Page;
