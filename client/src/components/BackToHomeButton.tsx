import { Button } from "@/components/UI/Button";

import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export default function BackToHomeButton() {
  return (
    <Link href={"/"} className="">
      <Button variant={"link"}>
        <ChevronLeftIcon /> Back
      </Button>
    </Link>
  );
}
