"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { images } from "@/app/constants";

import "./MainLayout.scss";

type Props = { children: React.ReactNode };

const MainLayout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="app__main-layout">
      {pathname === "/" && (
        <>
          <div className={`app__main-layout-image`}>
            <Image src={images.locationSearch} alt="location-search" priority />
          </div>
          <main className="children">{children}</main>
        </>
      )}

      {pathname !== "/" && (
        <main className="app__main-layout-children">{children}</main>
      )}
    </div>
  );
};

export default MainLayout;
