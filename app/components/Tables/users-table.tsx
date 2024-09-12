import React from "react";
import { TableColumn, Selector } from "react-data-table-component";

import { StatusTag } from "@/app/exports/exports";
import { UserRow } from "@/app/types/user";
import { formatDate } from "@/app/utils/utils";

interface TColumn extends TableColumn<UserRow> {
  selector: (row: UserRow) => any | Selector<UserRow>;
}

type Props = { row: UserRow };

export const USERS_TABLE_LG: TColumn[] = [
  {
    name: <span className="text-sm font-normal text-[#353945]">NAME</span>,
    selector: (row) => (
      <p className="text-base">{`${row.firstName} ${row.lastName}`}</p>
    ),
    allowOverflow: false,
    compact: true,
  },
  {
    name: <span className="text-sm font-normal text-[#353945]">EMAIL</span>,
    selector: (row) => <p className="text-base">{row.email}</p>,
    allowOverflow: false,
    compact: true,
    grow: 2,
  },
  {
    name: (
      <span className="text-sm font-normal text-[#353945]">PHONE NUMBER</span>
    ),
    selector: (row) => <p className="text-base">{row.phoneNumber}</p>,
    allowOverflow: false,
    compact: true,
  },
  {
    name: <span className="text-sm font-normal text-[#353945]">ROLE</span>,
    selector: (row) => <StatusTag status={row.role} />,
    center: true,
    compact: true,
  },
  {
    name: (
      <span className="text-sm font-normal text-[#353945]">DATE JOINED</span>
    ),
    selector: (row) => (
      <p className="text-base">{formatDate(row.createdAt, "MMMM Do, YYYY")}</p>
    ),
    allowOverflow: false,
    compact: true,
  },
];

const LeftColumn: React.FC<Props> = ({ row }) => {
  return (
    <div className="flex flex-col items-start justify-start gap-1">
      <p className="text-xs font-medium text-black">{`${row.firstName} ${row.lastName}`}</p>
      <p className="font-normal text-[#777E90] text-xs">
        {row.email} - {row.phoneNumber}
      </p>
    </div>
  );
};

const RightColumn: React.FC<Props> = ({ row }) => {
  return (
    <div className="flex flex-col items-end justify-start gap-1">
      <StatusTag size="small" status={row.role} />

      <p className="text-sm text-[#777E90] font-normal">
        {formatDate(row.createdAt, "MMMM Do, YYYY")}
      </p>
    </div>
  );
};

export const USERS_TABLE_SM: TColumn[] = [
  {
    name: "",
    selector: (row) => <LeftColumn row={row} />,
    allowOverflow: false,
    compact: true,
    wrap: true,
  },
  {
    name: "",
    selector: (row) => <RightColumn row={row} />,
    allowOverflow: false,
    compact: true,
    wrap: true,
  },
];
