"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, IconButton } from "@chakra-ui/react";
import { HStack, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { HiMenuAlt4, HiX } from "react-icons/hi";

import { images } from "@/app/constants";
import { ACTION_LINKS, SIDEBAR_LINKS } from "@/app/helpers/siderbar";
import useHandleLogout from "@/app/hooks/useHandleLogout";
import { useStore } from "@/app/zustand/store/useStore";

import "./Header.scss";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [activeLink, setActiveLink] = useState<string>("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<string>("");
  const [showMenu, setShowMenu] = useState(false);

  const pathname = usePathname();
  const { push } = useRouter();

  const { handleLogout } = useHandleLogout();
  const { user, setPageTitle } = useStore();

  useEffect(() => {
    if (user) {
      setName(`${user.firstName} ${user.lastName}`);
      setRole(user.role);
    }
  }, [user]);

  useEffect(() => {
    const activeLink = pathname.split("/")[1];
    setActiveLink(activeLink);
  }, [pathname]);

  const handleToggleMenu = () => setShowMenu(!showMenu);

  const handleRoute = (link: string, label: string) => {
    setShowMenu(false);
    setPageTitle(label);
    push(link);
  };

  return (
    <header className="app__header">
      <div className="app__header-left">
        <p className="title">{title}</p>
      </div>

      <div className="app__header-right">
        <Avatar name={name} className="app-avatar" />

        <div className="app__header-menu">
          <IconButton
            aria-label="menu"
            variant="ghost"
            icon={<HiMenuAlt4 />}
            onClick={handleToggleMenu}
            className="icon-button"
          />

          {showMenu && (
            <motion.div
              whileInView={{ x: [300, 0] }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="app__header-menu-content"
            >
              <div className="app__header-menu-content-logo">
                <Image src={images.logo128} alt="sidebar-logo" />

                <IconButton
                  aria-label="menu"
                  variant="ghost"
                  icon={<HiX />}
                  onClick={handleToggleMenu}
                  className="icon-button"
                />
              </div>

              <VStack
                spacing={2}
                align="stretch"
                className="app__header-menu-content-links"
              >
                {SIDEBAR_LINKS.filter((link) => link.pov.includes(role)).map(
                  (link, index) => (
                    <HStack
                      key={index}
                      spacing={1}
                      className={`app__header-menu-content-link ${
                        link.active === activeLink ? "active" : ""
                      }`}
                      onClick={handleRoute.bind(this, link.href, link.name)}
                    >
                      <Image
                        src={
                          link.active === activeLink
                            ? link.iconActive
                            : link.icon
                        }
                        alt={link.name}
                        className="icon"
                      />
                      <p
                        className={`${
                          link.active === activeLink ? "active" : ""
                        }`}
                      >
                        {link.name}
                      </p>
                    </HStack>
                  )
                )}
              </VStack>

              <VStack
                spacing={2}
                align="stretch"
                className="app__header-menu-content-links"
              >
                {ACTION_LINKS.filter((link) => link.pov.includes(role)).map(
                  (link, index) => (
                    <HStack
                      key={index}
                      spacing={1}
                      className={`app__header-menu-content-link ${
                        link.active === activeLink ? "active" : ""
                      }`}
                      onClick={
                        link.active === "logout"
                          ? handleLogout
                          : handleRoute.bind(this, link.href, link.name)
                      }
                    >
                      <Image
                        src={
                          link.active === activeLink
                            ? link.iconActive
                            : link.icon
                        }
                        alt={link.name}
                        className="icon"
                      />
                      <p
                        className={`${
                          link.active === activeLink ? "active" : ""
                        }`}
                      >
                        {link.name}
                      </p>
                    </HStack>
                  )
                )}
              </VStack>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
