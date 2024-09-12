import { ClaimStatus } from "../types/claim";

export type Status = { name: string; value: ClaimStatus };

export const STATUS: Status[] = [
  { name: "Submitted", value: ClaimStatus.SUBMITTED },
  { name: "Pending", value: ClaimStatus.PENDING },
  { name: "Accepted", value: ClaimStatus.ACCEPTED },
  { name: "Declined", value: ClaimStatus.DECLINED },
];
