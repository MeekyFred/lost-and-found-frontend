import React from "react";
import { TableColumn, Selector } from "react-data-table-component";

import { StatusTag } from "@/app/exports/exports";
import { ItemsRow } from "@/app/types/items";
import { formatDate } from "@/app/utils/utils";

interface TColumn extends TableColumn<ItemsRow> {
  selector: (row: ItemsRow) => any | Selector<ItemsRow>;
}

type Props = { row: ItemsRow };

export const ITEMS_TABLE_LG: TColumn[] = [
  {
    name: <span className="text-sm font-normal text-[#353945]">NAME</span>,
    selector: (row) => (
      <p className="text-base" onClick={row.handleView.bind(this, row.id)}>
        {row.name}
      </p>
    ),
    allowOverflow: false,
    compact: true,
  },
  {
    name: <span className="text-sm font-normal text-[#353945]">CATEGORY</span>,
    selector: (row) => (
      <p className="text-base" onClick={row.handleView.bind(this, row.id)}>
        {row.category}
      </p>
    ),
    allowOverflow: false,
    compact: true,
  },
  {
    name: (
      <span className="text-sm font-normal text-[#353945]">LOCATION FOUND</span>
    ),
    selector: (row) => (
      <p className="text-base" onClick={row.handleView.bind(this, row.id)}>
        {row.locationFound}
      </p>
    ),
    allowOverflow: false,
    compact: true,
  },
  {
    name: (
      <span className="text-sm font-normal text-[#353945]">DATE FOUND</span>
    ),
    selector: (row) => (
      <p className="text-base" onClick={row.handleView.bind(this, row.id)}>
        {formatDate(row.dateFound, "MMMM Do, YYYY")}
      </p>
    ),
    allowOverflow: false,
    compact: true,
  },
  {
    name: <span className="text-sm font-normal text-[#353945]">STATUS</span>,
    selector: (row) => (
      <StatusTag
        status={row.status}
        onClick={row.handleView.bind(this, row.id)}
      />
    ),
    center: true,
    compact: true,
  },
];

const LeftColumn: React.FC<Props> = ({ row }) => {
  return (
    <div
      className="flex flex-col items-start justify-start gap-1"
      onClick={row.handleView.bind(this, row.id)}
    >
      <p className="text-xs font-medium text-black">{row.name}</p>
      <p className="font-normal text-[#777E90] text-xs">
        {row.category} - {row.locationFound}
      </p>
    </div>
  );
};

const RightColumn: React.FC<Props> = ({ row }) => {
  return (
    <div
      className="flex flex-col items-end justify-start gap-1"
      onClick={row.handleView.bind(this, row.id)}
    >
      <StatusTag size="small" status={row.status} />

      <p className="text-sm text-[#777E90] font-normal">
        {formatDate(row.dateFound, "MMMM Do, YYYY")}
      </p>
    </div>
  );
};

export const ITEMS_TABLE_SM: TColumn[] = [
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
