import React from "react";
import Link, { LinkProps } from "next/link";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/UI/Tooltip";
import { Button } from "../UI/Button";
import { IconProps } from "@radix-ui/react-icons/dist/types";

interface LeftSidebarLinkProps extends LinkProps {
  name: string;
  tooltip: string;
  Icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
}

export default function LeftSidebarLink({
  name,
  tooltip,
  Icon,
  ...props
}: Readonly<LeftSidebarLinkProps>) {
  return (
    <Link
      {...props}
      className="hover:bg-black/20 w-full py-2 flex justify-center transition-all"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"link"}>
              <Icon />{" "}
              <span className="ml-2">
                {name[0].toUpperCase() + name.substring(1)}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={-100}>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
}
