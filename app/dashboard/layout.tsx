import React from "react";
import DashboardHeader from "./_component/dashboard-header";
import Sidebar from "./_component/sidebar";
type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div className="flex h-full">
      <DashboardHeader />
      <div className="w-full flex h-full">
        <div className="hidden md:flex h-full w-56 flex-col fixed bg-secondary border">
          <Sidebar />
        </div>
        <></>
        <div className=" w-full h-full mt-20 md:ml-56 px-10 py-4 bg-background">
          <main>{props.children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
