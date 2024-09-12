import { ItemCategory, ItemStatus } from "../types/items";

export type Category = { name: string; value: ItemCategory };
export type Status = { name: string; value: ItemStatus };

export const CATEGORIES: Category[] = [
  { name: "Books", value: ItemCategory.BOOKS },
  { name: "Clothing", value: ItemCategory.CLOTHING },
  { name: "Electronics", value: ItemCategory.ELECTRONICS },
  { name: "Furniture", value: ItemCategory.FURNITURE },
  { name: "Jewelry", value: ItemCategory.JEWELRY },
  { name: "Other", value: ItemCategory.OTHER },
  { name: "Sports", value: ItemCategory.SPORTS },
];

export const STATUS: Status[] = [
  { name: "Unclaimed", value: ItemStatus.UNCLAIMED },
  { name: "Processing", value: ItemStatus.PROCESSING },
  { name: "Claimed", value: ItemStatus.CLAIMED },
  { name: "Archived", value: ItemStatus.ARCHIVED },
];
