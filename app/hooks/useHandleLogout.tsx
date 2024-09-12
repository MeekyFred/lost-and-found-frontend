"use client";

import { useRouter } from "next/navigation";
import { deleteCookie, getCookies } from "cookies-next";

import { useStore } from "@/app/zustand/store/useStore";

type Router = ReturnType<typeof useRouter>;

const useHandleLogout = () => {
  const router = useRouter();
  const { resetAuth, resetPage, resetPagination } = useStore();

  const handleLogoutWithRouter = (router: Router) => {
    clearCookies();
    localStorage.clear();
    resetAuth();
    resetPage();
    resetPagination();
    router.push("/");
  };

  function clearCookies() {
    const cookies = getCookies();
    Object.keys(cookies).forEach((key) => deleteCookie(key));
  }

  const handleLogout = () => {
    handleLogoutWithRouter(router);
  };

  return { handleLogout };
};

export default useHandleLogout;
