"use client";

import React, { useEffect, useState } from "react";

import "./StatusTag.scss";

type Props = {
  size?: string;
  status: string;
  text?: string;
  type?: string;
  onClick?: () => void;
};

const StatusTag: React.FC<Props> = ({ onClick, size, status, text, type }) => {
  const [label, setLabel] = useState("");
  const [style, setStyle] = useState("");

  useEffect(() => {
    switch (status) {
      case "N/A":
        setLabel("N/A");
        setStyle("declined");
        break;

      // Item statuses

      case "ARCHIVED":
        setLabel("archived");
        setStyle("archived");
        break;

      case "CLAIMED":
        setLabel("claimed");
        setStyle("claimed");
        break;

      case "UNCLAIMED":
        setLabel("unclaimed");
        setStyle("unclaimed");
        break;

      case "PROCESSING":
        setLabel("processing");
        setStyle("processing");
        break;

      // Claim statuses

      case "ACCEPTED":
        setLabel("accepted");
        setStyle("accepted");
        break;

      case "DECLINED":
        setLabel("declined");
        setStyle("declined");
        break;

      case "PENDING":
        setLabel("pending");
        setStyle("pending");
        break;

      case "SUBMITTED":
        setLabel("submitted");
        setStyle("submitted");
        break;

      // User roles
      case "ADMIN":
        setLabel("admin");
        setStyle("admin");
        break;

      case "USER":
        setLabel("user");
        setStyle("user");
        break;

      default:
        break;
    }
  }, [status, type]);

  return (
    <div className={`${size} status-tag ${style}`} onClick={onClick}>
      {text} {label}
    </div>
  );
};

export default StatusTag;
