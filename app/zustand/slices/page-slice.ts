import { StateCreator } from "zustand";

export interface PageSlice {
  pageTitle: string;
  setPageTitle: (title: string) => void;
  resetPage: () => void;
}

export type PageState = {
  pageTitle: string;
};

export type PageActions = {
  setPageTitle: () => void;
  resetPage: () => void;
};

export type PageStore = PageState & PageActions;

export const defaultPageState: PageState = {
  pageTitle: "Inventory",
};

export const createPageSlice: StateCreator<PageSlice> = (set) => ({
  ...defaultPageState,
  setPageTitle: (pageTitle: string) => set({ pageTitle }),
  resetPage: () => set({ pageTitle: "Inventory" }),
});
