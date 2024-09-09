import React from "react";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { MainLayout } from "@/app/exports/exports";
import { Providers } from "@/app/providers/Providers";

import "../globals.css";
import "../scss/styles.scss";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lost and Found | Home",
  description: "Lost and Found home page",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
