"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type ActiveLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
};

export default function ActiveLink({
  href,
  children,
  className = "",
  activeClassName = "text-green-600",
  ...props
}: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? activeClassName : ""}`}
      {...props}
    >
      {children}
    </Link>
  );
}
