import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";


export const metadata: Metadata = {
  title: "Thread App",
  description: "A Next.js app which is a clone of Thread",
};

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
