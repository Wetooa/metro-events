import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import RightSidebar from "@/components/RightSidebar/RightSidebar";
import { cn } from "@/utils/utils";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metro Events",
  description: "Event Tracking App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex justify-center">
      <body>
        <Providers>
          <div
            className={cn(
              inter.className,
              "flex min-h-screen max-w-7xl relative"
            )}
          >
            <LeftSidebar />
            <div className="flex-1 w-screen">{children}</div>
            <RightSidebar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
