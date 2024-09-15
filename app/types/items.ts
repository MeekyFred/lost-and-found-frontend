import { Claim } from "./claim";

export enum ItemStatus {
  ALL = "",
  ARCHIVED = "ARCHIVED",
  CLAIMED = "CLAIMED",
  UNCLAIMED = "UNCLAIMED",
  PROCESSING = "PROCESSING",
}

export enum ItemCategory {
  ALL = "",
  ELECTRONICS = "ELECTRONICS",
  CLOTHING = "CLOTHING",
  FURNITURE = "FURNITURE",
  BOOKS = "BOOKS",
  JEWELRY = "JEWELRY",
  SPORTS = "SPORTS",
  OTHER = "OTHER",
}

export interface ItemObject {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  description: string;
  status: ItemStatus;
  locationFound: string;
  dateFound: Date;
  createdAt: string;
  updatedAt: string;
  claim: Claim;
}

export interface ItemsRow {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  description: string;
  status: ItemStatus;
  locationFound: string;
  dateFound: Date;
  createdAt: string;
  updatedAt: string;
  handleView: (id: string) => void;
}

export interface CreateItemFormikData {
  name: string;
  category: string;
  imageUrl: string;
  description: string;
  status: ItemStatus;
  locationFound: string;
  dateFound: Date | null;
  inPossession: boolean;
}
