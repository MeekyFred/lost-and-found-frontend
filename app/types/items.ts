export enum ItemStatus {
  ALL = "ALL",
  ARCHIVED = "ARCHIVED",
  CLAIMED = "CLAIMED",
  UNCLAIMED = "UNCLAIMED",
  PROCESSING = "PROCESSING",
}

export interface ItemsType {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  description: string | null;
  status: ItemStatus;
  locationFound: string;
  dateFound: Date;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ItemsRow {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  description: string | null;
  status: ItemStatus;
  locationFound: string;
  dateFound: Date;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  handleView: (id: string) => void;
}
