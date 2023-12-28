import type { Metadata } from "next";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import RightSidebar from "@/components/RightSidebar/RightSidebar";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/NextTheme/ThemeProvider";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Metro Events",
  description: "Event Tracking App",
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex justify-center">
      <body className={cn(fontSans.className)}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className={"flex min-h-screen max-w-7xl relative"}>
              <LeftSidebar />
              <div className="flex-1 w-screen">{children}</div>
              <RightSidebar />
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
