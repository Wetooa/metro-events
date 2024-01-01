import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/UI/Drawer";
import { Button } from "./UI/Button";
import { Calendar } from "./UI/Calendar";

interface CalendarDrawerProps {}

export default function CalendarDrawer({}: CalendarDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger className="w-full text-start">Calendar</DrawerTrigger>
      <DrawerContent className="flex flex-col items-center">
        <DrawerHeader>
          <DrawerTitle className="text-center text-3xl">
            View Your Calendar
          </DrawerTitle>
          <DrawerDescription>
            Events that you have followed are displayed below!
          </DrawerDescription>
        </DrawerHeader>

        <Calendar />

        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
