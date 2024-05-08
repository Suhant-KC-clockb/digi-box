
import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Lexend_Deca({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DigiBox Guru",
  description: "Welcome to Digibox",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Toaster />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
