"use client";

import React from "react";
import Image from "next/image";

import { images } from "@/app/constants";

import "./AuthLayout.scss";

type Props = { children: React.ReactNode };

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="app__auth-layout">
      <div className="sidebar__section">
        <h1>Never Say Bye To Your Lost Items</h1>

        <Image src={images.twoFactorAuth} alt="2fa-auth" />

        <p>
          We’ll help you keep track of your lost items, so you don’t have to
          lose them forever.
        </p>
      </div>

      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
