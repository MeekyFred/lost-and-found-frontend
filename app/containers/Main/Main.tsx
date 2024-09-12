"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import "./Main.scss";

const Main: React.FC = () => {
  const { push } = useRouter();

  const handleRoute = (role: string) => {
    push(`/${role}/login`);
  };

  return (
    <div className="app__page-main">
      <div className="main__section">
        <h1 className="main__section__title">Welcome to Lost and Found</h1>
        <p className="main__section__subtitle">Please choose Your Role</p>
        <div className="main__section__roles">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="main__section__roles__role"
            onClick={handleRoute.bind(this, "admin")}
          >
            <h2>Admin</h2>
            <p>Manage all items and claims</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="main__section__roles__role"
            onClick={handleRoute.bind(this, "user")}
          >
            <h2>User</h2>
            <p>Claim your lost item</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Main;
