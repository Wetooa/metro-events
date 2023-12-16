import Link from "next/link";
import React from "react";

interface LeftSidebarLinkProps {
  name: string;
  src: string;
}

export default function LeftSidebarLink({ name, src }: LeftSidebarLinkProps) {
  return (
    <Link className="group/link" href={src}>
      <p>{name}</p>
      {/* <span className="transition-all group/link hidden group-hover/link:absolute left-20">
            testing
          </span> */}
    </Link>
  );
}
