import React from "react";
import type { Metadata } from "next";

import { AuthLayout } from "@/app/exports/exports";

export const metadata: Metadata = {
  title: "Lost and Found | User Login",
  description: "Lost and Found user login page",
};

function RootUserAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayout>{children}</AuthLayout>;
}

export default RootUserAuthLayout;
