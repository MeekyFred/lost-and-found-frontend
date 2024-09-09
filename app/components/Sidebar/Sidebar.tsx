"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { HStack, VStack } from "@chakra-ui/react";

import { images } from "@/app/constants";
import { ACTION_LINKS, SIDEBAR_LINKS } from "@/app/helpers/siderbar";
import useHandleLogout from "@/app/hooks/useHandleLogout";
import { useStore } from "@/app/zustand/store/useStore";

import "./Sidebar.scss";

interface SidebarProps {
  // Add any props you need for the Sidebar component
}

const Sidebar: React.FC<SidebarProps> = () => {
  const [activeLink, setActiveLink] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const pathname = usePathname();
  const { push } = useRouter();

  const { handleLogout } = useHandleLogout();
  const { user, setPageTitle } = useStore();

  useEffect(() => {
    const parts = pathname.split("/"); // Splits the string by "/"
    const activeLink = parts[parts.length - 1]; // Gets the last part
    setActiveLink(activeLink);
  }, [pathname]);

  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user]);

  const handleRoute = (link: string, label: string) => {
    setPageTitle(label);
    push(link);
  };

  return (
    <div className="app__sidebar" data-testid="sidebar">
      <div className="app__sidebar-top">
        <Image
          src={images.logo128}
          alt="sidebar-logo"
          className="logo"
          priority
        />

        <VStack spacing={2} align="stretch" className="app__sidebar-links">
          {SIDEBAR_LINKS.filter((link) => link.pov.includes(role)).map(
            (link, index) => (
              <HStack
                key={index}
                spacing={1}
                className={`app__sidebar-link ${
                  link.active === activeLink ? "active" : ""
                }`}
                onClick={handleRoute.bind(this, link.href, link.name)}
                data-testid="sidebar-link"
              >
                <Image
                  src={link.active === activeLink ? link.iconActive : link.icon}
                  alt={link.name}
                  className="icon"
                />
                <p
                  className={`${link.active === activeLink ? "active" : ""}`}
                  data-testid="sidebar-link-text"
                >
                  {link.name}
                </p>
              </HStack>
            )
          )}
        </VStack>
      </div>

      <div className="app__sidebar-bottom">
        <VStack spacing={2} align="stretch" className="app__sidebar-links">
          {ACTION_LINKS.filter((link) => link.pov.includes(role)).map(
            (link, index) => (
              <HStack
                key={index}
                spacing={1}
                className={`app__sidebar-link ${
                  link.active === activeLink ? "active" : ""
                }`}
                onClick={
                  link.active === "logout"
                    ? handleLogout
                    : handleRoute.bind(this, link.href, link.name)
                }
                data-testid={
                  link.active === "logout" ? "logout-button" : "action-link"
                }
              >
                <Image
                  src={link.active === activeLink ? link.iconActive : link.icon}
                  alt={link.name}
                  className="icon"
                />
                <p
                  className={`${link.active === activeLink ? "active" : ""}`}
                  data-testid="action-link-text"
                >
                  {link.name}
                </p>
              </HStack>
            )
          )}
        </VStack>
      </div>
    </div>
  );
};

export default Sidebar;
