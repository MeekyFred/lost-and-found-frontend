import { ItemObject } from "./items";
import { Author } from "./user";

export enum ClaimStatus {
  ALL = "ALL",
  SUBMITTED = "SUBMITTED",
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}

export interface Claim {
  id: string;
  status: ClaimStatus;
  dateLost: string;
  author: Author;
  item: ItemObject;
  createdAt: string;
  updatedAt: string;
}

export interface ClaimRow {
  id: string;
  status: ClaimStatus;
  dateLost: string;
  author: Author;
  item: ItemObject;
  createdAt: string;
  updatedAt: string;
  handleView: (claim: Claim) => void;
}

export interface CreateClaimFormikData {
  status: ClaimStatus;
}
