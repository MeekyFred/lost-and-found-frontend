import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { type AuthSlice, createAuthSlice } from "../slices/auth-slice";
import { type PageSlice, createPageSlice } from "../slices/page-slice";
import { type PaginationSlice, createPaginationSlice } from '../slices/pagination-slice'; // prettier-ignore

interface StoreSlice extends AuthSlice, PageSlice, PaginationSlice {}

export const useStore = create<StoreSlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createPageSlice(...a),
        ...createPaginationSlice(...a),
      }),
      { name: "store" }
    )
  )
);
