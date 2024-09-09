import React from "react";
import type { Metadata } from "next";

import { AdminLayout } from "@/app/exports/exports";

export const metadata: Metadata = {
  title: "Lost and Found | Admin Dashboard",
  description: "Lost and Found Admin dashboard page",
};

function RootAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayout>{children}</AdminLayout>;
}

export default RootAdminLayout;
