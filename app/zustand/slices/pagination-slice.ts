import { StateCreator } from "zustand";
import { Pagination } from "@/app/types/pagination";

export interface PaginationSlice {
  pagination: Pagination;
  setPagination: (payload: Pagination) => void;
  resetPagination: () => void;
}

export type PaginationState = {
  pagination: Pagination;
};

const initState: Pagination = {
  total: 0,
  page: 1,
  pages: 0,
  limit: 10,
};

export const defaultPaginationState: PaginationState = {
  pagination: initState,
};

export const createPaginationSlice: StateCreator<PaginationSlice> = (set) => ({
  ...defaultPaginationState,
  setPagination: (pagination: Pagination) => set({ pagination }),
  resetPagination: () => set({ pagination: initState }),
});
