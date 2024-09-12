"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { HStack, VStack } from "@chakra-ui/react";
import { SlArrowLeft } from "react-icons/sl";

import { Placeholder, Spinner, StatusTag } from "@/app/exports/exports";
import useGlobalToast from "@/app/hooks/useGlobalToast";
import useGetByIdQuery from "@/app/queries/useGetByIdQuery";
import { getItem as getItemAPI } from "@/app/services/items.service";
import { ItemObject } from "@/app/types/items";
import { formatDate } from "@/app/utils/utils";
import { useStore } from "@/app/zustand/store/useStore";

import ClaimModal from "./ClaimModal";
import CreateItemModal from "../Inventory/Modals/CreateItemModal";

import "./ItemDetail.scss";

interface ModalOpenState {
  claimModal: boolean;
  editModal: boolean;
}

interface HandleModalVisibilityArgs {
  key: keyof ModalOpenState;
}

const initModalState = {
  claimModal: false,
  editModal: false,
};

type Props = { id: string };

const ItemDetail: React.FC<Props> = ({ id }) => {
  const [item, setItem] = useState<ItemObject | null>();
  const [isOpen, setIsOpen] = useState<ModalOpenState>(initModalState);

  const { push } = useRouter();

  const { showToast } = useGlobalToast();
  const { user } = useStore();

  const { data, isPending, triggerRefetch, cancelQuery } = useGetByIdQuery({
    apiService: getItemAPI,
    enabled: !!id,
    payload: { id },
    queryKey: `get-item-${id}`,
  });

  useEffect(() => {
    if (!data) return;
    setItem(data);
  }, [data]);

  const handleGoBack = () => {
    cancelQuery();
    setItem(null);
    user?.role === "USER" ? push("/user/items") : push("/admin/inventory");
  };

  function handleOpen({ key }: HandleModalVisibilityArgs) {
    setIsOpen((prev) => ({ ...prev, [key]: true }));
  }

  function handleClose({ key }: HandleModalVisibilityArgs) {
    setIsOpen((prev) => ({ ...prev, [key]: false }));
  }

  return (
    <AnimatePresence>
      <motion.div
        key="app__items-details"
        className="app__items-details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          delayChildren: 0.5,
        }}
      >
        {item && (
          <ClaimModal
            item={item}
            isOpen={isOpen.claimModal}
            handleClose={handleClose.bind(this, { key: "claimModal" })}
            handleRefetch={triggerRefetch}
          />
        )}

        {item && (
          <CreateItemModal
            item={item}
            isOpen={isOpen.editModal}
            type="edit"
            handleClose={handleClose.bind(this, { key: "editModal" })}
            refreshPage={triggerRefetch}
          />
        )}

        {isPending && <Spinner />}

        {!isPending && (
          <>
            <div className="app__items-details-controls">
              <Button
                variant="outline"
                colorScheme="gray"
                leftIcon={<SlArrowLeft />}
                fontWeight={400}
                onClick={handleGoBack}
              >
                Go back
              </Button>

              {user?.role === "USER" && (
                <Button
                  type="submit"
                  variant="solid"
                  colorScheme="primary"
                  size="md"
                  onClick={handleOpen.bind(this, { key: "claimModal" })}
                  isDisabled={item?.status === "CLAIMED" || item?.status === "PROCESSING"} // prettier-ignore
                >
                  Claim
                </Button>
              )}

              {user?.role === "ADMIN" && (
                <ButtonGroup>
                  <Button
                    type="submit"
                    variant="solid"
                    colorScheme="primary"
                    size="md"
                    onClick={handleOpen.bind(this, { key: "editModal" })}
                    isDisabled={item?.status === "CLAIMED" || item?.status === "PROCESSING"} // prettier-ignore
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              )}
            </div>

            {item ? (
              <div className="app__items-details-body">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={1000}
                  height={1000}
                />

                <VStack align="stretch" spacing={2} className="info">
                  <HStack width="full" justify="space-between">
                    <p className="label">Name</p>
                    <p className="value">{item.name}</p>
                  </HStack>

                  <HStack width="full" justify="space-between">
                    <p className="label">Category</p>
                    <p className="value">{item.category}</p>
                  </HStack>

                  <HStack width="full" justify="space-between">
                    <p className="label">Description</p>
                    <p className="value">{item.description}</p>
                  </HStack>

                  <HStack width="full" justify="space-between">
                    <p className="label">Date Found</p>
                    <p className="value">
                      {formatDate(item.dateFound, "MMMM Do, YYYY")}
                    </p>
                  </HStack>

                  <HStack width="full" justify="space-between">
                    <p className="label">Location Found</p>
                    <p className="value">{item.locationFound}</p>
                  </HStack>

                  <HStack width="full" justify="space-between">
                    <p className="label">Status</p>
                    <StatusTag status={item.status} />
                  </HStack>
                </VStack>
              </div>
            ) : (
              <Placeholder hideBtn text="This item does not exist 📊" />
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ItemDetail;
