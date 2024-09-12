"use client";

import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { ModalHeader, ModalBody } from "@chakra-ui/react";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { HStack, useBreakpointValue, VStack } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import DatePicker from "react-datepicker";
import { MdKeyboardArrowDown } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";

import useGlobalToast from "@/app/hooks/useGlobalToast";
import usePostQuery from "@/app/queries/usePostQuery";
import { claimItem as claimItemAPI } from "@/app/services/items.service";
import { ItemObject } from "@/app/types/items";
import { useStore } from "@/app/zustand/store/useStore";

import "./ClaimModal.scss";

type Props = {
  isOpen: boolean;
  item: ItemObject;
  handleClose: () => void;
  handleRefetch: () => void;
};

const ClaimModal: React.FC<Props> = (props) => {
  const [date, setDate] = useState<Date | null>(null);

  const { item, isOpen, handleClose, handleRefetch } = props;

  const modalSize = useBreakpointValue({ base: "sm", md: "md" });

  const { showToast } = useGlobalToast();
  const { user } = useStore();

  const { isPending, mutateAsync: claimItem } = usePostQuery({
    apiService: claimItemAPI,
    queryKey: "claimItem",
  });

  const handleChange = (date: Date | null) => {
    setDate(date);
  };

  const handleSubmit = async () => {
    const payload = {
      data: {
        authorId: user?.id,
        dateLost: date,
        itemId: item?.id,
      },
    };

    const response = await claimItem(payload);

    if (response?.id) {
      handleRefetch();
      showToast("Your claim was made successfully", "success");
      setDate(null);
      handleClose();
    } else {
      showToast("Your claim was unsuccessful, try again", "error");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      motionPreset="scale"
      scrollBehavior="inside"
      isCentered
      size={modalSize}
    >
      <ModalOverlay />
      <ModalContent data-testid="claim-modal" className="app__modal__content">
        <ModalHeader className="app__modal__header">
          <div className="app__modal__header-group">
            <h2>Make a claim</h2>

            <div className="close__modal__btn" onClick={handleClose}>
              <AiOutlineClose />
            </div>
          </div>
        </ModalHeader>

        <ModalBody className="claim__modal__body" title="modal-body">
          <Box className="preview">
            <VStack width="full" align="flex-start">
              <HStack className="w-full" justify="space-between">
                <p className="preview__label">Name</p>
                <p className="preview__value">{item?.name}</p>
              </HStack>

              <HStack className="w-full" justify="space-between">
                <p className="preview__label">Category</p>
                <p className="preview__value">{item?.category}</p>
              </HStack>

              <HStack className="w-full" justify="space-between">
                <p className="preview__label">Description</p>
                <p className="preview__value">{item?.description}</p>
              </HStack>

              <HStack className="w-full" justify="space-between">
                <p className="preview__label">Location Found</p>
                <p className="preview__value">{item?.locationFound}</p>
              </HStack>
            </VStack>
          </Box>

          <div className="date-picker">
            <BiCalendar className="calendar" />

            <DatePicker
              className="date"
              selected={date}
              onChange={handleChange}
              dateFormat="dd/MM/yyyy"
              popperPlacement="top-end"
              placeholderText="Select the day you lost this item"
              dateFormatCalendar="MMMM"
              showMonthDropdown
              showYearDropdown
              scrollableYearDropdown
              dropdownMode="select"
              autoFocus={false}
            />

            <MdKeyboardArrowDown className="arrow" />
          </div>

          <ButtonGroup marginY={2} width="full">
            <Button
              type="submit"
              variant="outline"
              colorScheme="primary"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              variant="solid"
              colorScheme="primary"
              onClick={handleSubmit}
              isLoading={isPending}
              isDisabled={!date}
            >
              Claim
            </Button>
          </ButtonGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ClaimModal;
