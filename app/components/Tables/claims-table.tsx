import React from "react";
import { TableColumn, Selector } from "react-data-table-component";

import { StatusTag } from "@/app/exports/exports";
import { ClaimRow } from "@/app/types/claim";
import { formatDate } from "@/app/utils/utils";

interface TColumn extends TableColumn<ClaimRow> {
  selector: (row: ClaimRow) => any | Selector<ClaimRow>;
}

type Props = { row: ClaimRow };

export const CLAIMS_TABLE_LG: TColumn[] = [
  {
    name: <span className="text-sm font-normal text-[#353945]">ITEM NAME</span>,
    selector: (row) => (
      <p className="text-base" onClick={row.handleView.bind(this, row)}>
        {row.item.name}
      </p>
    ),
    allowOverflow: false,
    compact: true,
  },
  {
    name: <span className="text-sm font-normal text-[#353945]">CATEGORY</span>,
    selector: (row) => (
      <p className="text-base" onClick={row.handleView.bind(this, row)}>
        {row.item.category}
      </p>
    ),
    allowOverflow: false,
    compact: true,
  },
  {
    name: <span className="text-sm font-normal text-[#353945]">CLAIMANT</span>,
    selector: (row) => (
      <p className="text-base" onClick={row.handleView.bind(this, row)}>
        {`${row.author.firstName} ${row.author.lastName}`}
      </p>
    ),
    allowOverflow: false,
    compact: true,
  },
  {
    name: <span className="text-sm font-normal text-[#353945]">DATE LOST</span>,
    selector: (row) => (
      <p className="text-base" onClick={row.handleView.bind(this, row)}>
        {formatDate(row.dateLost, "MMMM Do, YYYY")}
      </p>
    ),
    allowOverflow: false,
    compact: true,
  },
  {
    name: (
      <span className="text-sm font-normal text-[#353945]">CLAIM DATE</span>
    ),
    selector: (row) => (
      <p className="text-base" onClick={row.handleView.bind(this, row)}>
        {formatDate(row.createdAt, "MMMM Do, YYYY")}
      </p>
    ),
    allowOverflow: false,
    compact: true,
  },
  {
    name: <span className="text-sm font-normal text-[#353945]">STATUS</span>,
    selector: (row) => (
      <StatusTag status={row.status} onClick={row.handleView.bind(this, row)} />
    ),
    center: true,
    compact: true,
  },
];

const LeftColumn: React.FC<Props> = ({ row }) => {
  return (
    <div
      className="flex flex-col items-start justify-start gap-1"
      onClick={row.handleView.bind(this, row)}
    >
      <p className="text-xs font-medium text-black">{row.item.name}</p>
      <p className="font-normal text-[#777E90] text-xs">
        {row.item.category} - {`${row.author.firstName} ${row.author.lastName}`}
      </p>
    </div>
  );
};

const RightColumn: React.FC<Props> = ({ row }) => {
  return (
    <div
      className="flex flex-col items-end justify-start gap-1"
      onClick={row.handleView.bind(this, row)}
    >
      <StatusTag size="small" status={row.status} />

      <p className="text-sm text-[#777E90] font-normal">
        {formatDate(row.createdAt, "MMMM Do, YYYY")}
      </p>
    </div>
  );
};

export const CLAIMS_TABLE_SM: TColumn[] = [
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
