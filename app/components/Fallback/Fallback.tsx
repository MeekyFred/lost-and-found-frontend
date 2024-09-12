"use client";

import React from "react";
import { Spinner } from "@chakra-ui/react";

import "./Fallback.scss";

type Props = {};

const Fallback: React.FC<Props> = ({}) => {
  return (
    <div className="app__fallback">
      <Spinner
        thickness="4px"
        speed="0.45s"
        emptyColor="#A5B0BA"
        color="primary.500"
        size="md"
        padding={6}
      />
    </div>
  );
};

export default Fallback;
