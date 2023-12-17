import React from "react";
import Link, { LinkProps } from "next/link";

interface LeftSidebarLinkProps extends LinkProps {
  name: string;
}

export default function LeftSidebarLink({
  name,
  ...props
}: Readonly<LeftSidebarLinkProps>) {
  return (
    <Link {...props} className="group/link">
      <p>{name}</p>
      {/* <span className="transition-all group/link hidden group-hover/link:absolute left-20">
            testing
          </span> */}
    </Link>
  );
}
