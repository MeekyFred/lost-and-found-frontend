"use client";

import { useCallback } from "react";
import { useToast, UseToastOptions } from "@chakra-ui/react";

const useGlobalToast = () => {
  const toast = useToast();

  const showToast = useCallback(
    (description: string, status: UseToastOptions["status"]) => {
      if (!toast.isActive("global-toast")) {
        toast({
          id: "global-toast",
          description,
          duration: status === "loading" ? null : 3500,
          isClosable: status !== "loading" ? true : false,
          position: "top",
          status,
          variant: "solid",
        });
      }
    },
    [toast]
  );

  const updateToast = useCallback(
    (description: string, status: UseToastOptions["status"]) => {
      if (toast.isActive("global-toast")) {
        toast.update("global-toast", {
          description,
          status,
          duration: 3500,
          isClosable: true,
          variant: "solid",
        });
      }
    },
    [toast]
  );

  return { showToast, updateToast, toast };
};

export default useGlobalToast;
