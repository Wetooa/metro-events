import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/NextTheme/ThemeProvider";
import Providers from "@/components/Providers";
import SharedLayout from "@/components/SharedLayout";

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
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fontSans.className, "flex justify-center")}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className={"min-h-screen w-screen relative"}>
              <SharedLayout>{children}</SharedLayout>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
