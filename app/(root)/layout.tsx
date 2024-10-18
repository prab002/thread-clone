import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

import Topbar from "@/components/shared/Topbar";
import Leftbar from "@/components/shared/Leftbar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Thread App",
  description: "A Next.js app which is a clone of Thread",
  icons: {
    icon: "https://i.pinimg.com/control/564x/7b/00/dc/7b00dc7ba16b346ab34c5da176b5b491.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Topbar />
          <main>
            <Leftbar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSidebar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
