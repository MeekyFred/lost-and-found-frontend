import React from "react";
import type { Metadata } from "next";

import { AuthLayout } from "@/app/exports/exports";

export const metadata: Metadata = {
  title: "Lost and Found | Admin Login",
  description: "Lost and Found Admin login page",
};

function RootAdminAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayout>{children}</AuthLayout>;
}

export default RootAdminAuthLayout;
