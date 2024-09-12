import React from "react";
import type { Metadata } from "next";

import { UserLayout } from "@/app/exports/exports";

import "../../../globals.css";
import "../../../scss/styles.scss";

export const metadata: Metadata = {
  title: "Lost and Found | User Dashboard",
  description: "Lost and Found User dashboard page",
};

function RootUserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <UserLayout>{children}</UserLayout>;
}

export default RootUserLayout;
