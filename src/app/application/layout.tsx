import Navbar from "@/components/organisms/navbar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="w-full ">
      <div className="pt-32 mx-auto w-8/12">{children}</div>
    </main>
  );
};

export default Layout;
