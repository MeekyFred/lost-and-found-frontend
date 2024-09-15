"use client";

import React, { useEffect, useState } from "react";
import type { Dispatch, FC, SetStateAction } from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { ModalHeader, ModalBody } from "@chakra-ui/react";
import { Box, Button, ButtonGroup, Switch } from "@chakra-ui/react";
import { Select, useBreakpointValue } from "@chakra-ui/react";
import { HStack, Stack, VStack } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FileInput } from "@/app/exports/exports";
import { CATEGORIES, STATUS } from "@/app/helpers/items";
import useGlobalToast from "@/app/hooks/useGlobalToast";
import usePostQuery from "@/app/queries/usePostQuery";
import { CreateItemSchema } from "@/app/lib/yup";
import { createItem as createItemAPI } from "@/app/services/admin.service";
import { updateItem as updateItemAPI } from "@/app/services/admin.service";
import { AuthRoles } from "@/app/types/auth";
import { InputState, initialState } from "@/app/types/file-input";
import { CreateItemFormikData, ItemObject, ItemStatus } from "@/app/types/items"; // prettier-ignore
import { useStore } from "@/app/zustand/store/useStore";

import "./CreateItemModal.scss";

type Props = {
  item?: ItemObject;
  isOpen: boolean;
  type: "edit" | "create";
  handleClose: () => void;
  setType?: Dispatch<SetStateAction<"edit" | "create">>;
  refreshPage: () => void;
};

const CreateItemModal: FC<Props> = (props) => {
  const [inputState, setInputState] = useState<InputState>(initialState);

  const { handleClose, item, isOpen, refreshPage, setType, type } = props;

  useEffect(() => {
    if (type === "edit" && item) {
      setInputState((prevState) => ({
        ...prevState,
        fileName: item?.name,
        url: item?.imageUrl,
        uploadView: "selected",
      }));
    }
  }, [item, type]);

  const { showToast } = useGlobalToast();
  const { user } = useStore();

  const InitialValues: CreateItemFormikData = {
    name: type === "edit" ? item?.name! : "",
    category: type === "edit" ? item?.category! : "",
    description: type === "edit" ? item?.description! : "",
    imageUrl: type === "edit" ? item?.imageUrl! : "",
    status: type === "edit" ? item?.status! : ItemStatus.UNCLAIMED,
    locationFound: type === "edit" ? item?.locationFound! : "",
    dateFound: type === "edit" ? new Date(item?.dateFound!) : null,
    inPossession: false,
  };

  const { mutateAsync: createItem } = usePostQuery({
    apiService: createItemAPI,
    queryKey: "createItem",
  });

  const { mutateAsync: updateItem } = usePostQuery({
    apiService: updateItemAPI,
    queryKey: "updateItem",
  });

  const modalSize = useBreakpointValue({ base: "sm", md: "lg" });

  const handleSubmit = async (formData: CreateItemFormikData) => {
    const data = {
      id: item?.id,
      name: formData.name,
      category: formData.category,
      imageUrl: formData.imageUrl,
      description: formData.description,
      status: formData.status,
      locationFound: formData.locationFound,
      dateFound: formData.dateFound,
    };

    if (type === "edit") {
      const payload = { data };

      const response = await updateItem(payload);

      if (response?.success) {
        showToast(response.message, "success");
        setInputState(initialState);
        return response?.success;
      }

      return false;
    } else {
      const payload = { data };

      const response = await createItem(payload);

      if (response?.success) {
        showToast(response.message, "success");
        setInputState(initialState);
        return response?.success;
      }

      return false;
    }
  };

  const handleCloseModal = () => {
    setType && setType("create");
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      motionPreset="scale"
      scrollBehavior="inside"
      isCentered
      size={modalSize}
    >
      <ModalOverlay />
      <ModalContent data-testid="order-modal" className="app__modal__content">
        <ModalHeader className="app__modal__header">
          <div className="app__modal__header-group">
            <h2>{`${type === "create" ? "Create" : "Edit"}`} item</h2>

            <div className="close__modal__btn" onClick={handleCloseModal}>
              <AiOutlineClose />
            </div>
          </div>
        </ModalHeader>

        <ModalBody className="create__item__modal__body" title="modal-body">
          <Formik
            initialValues={InitialValues}
            validationSchema={CreateItemSchema}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(true);

              const updatedValues: CreateItemFormikData = {
                name: values.name,
                category: values.category,
                imageUrl: inputState.url!,
                description: values.description,
                status: values.status,
                locationFound: values.locationFound,
                dateFound: values.dateFound,
                inPossession: values.inPossession,
              };

              const res = await handleSubmit(updatedValues);

              if (!res) return;

              refreshPage();
              handleClose();
              actions.setSubmitting(false);
              actions.resetForm();
            }}
          >
            {({ dirty, errors, isSubmitting, isValid, touched, values }) => {
              // prettier-ignore
              const isDisabled = isSubmitting || !isValid || !dirty || !inputState.url;

              return (
                <Form>
                  <VStack align="flex-start" spacing={3} width="full">
                    <VStack spacing={1} width="full">
                      <Box className="form-info">
                        <label htmlFor="name">Name</label>
                        <div>
                          {errors.name && touched.name ? errors.name : ""}
                        </div>
                      </Box>

                      <Field
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter item name"
                        className="formik-field"
                      />
                    </VStack>

                    <VStack spacing={1} width="full">
                      <Box className="form-info">
                        <label htmlFor="category">Category</label>
                        <div>
                          {errors.category && touched.category
                            ? errors.category
                            : ""}
                        </div>
                      </Box>

                      <Field>
                        {({ field }: FieldProps) => (
                          <Select
                            id="category"
                            name="category"
                            onChange={field.onChange}
                            className="dropdown-field"
                            placeholder="Select category"
                            defaultValue={item?.category ?? ""}
                          >
                            {CATEGORIES.map((category, index) => (
                              <option key={index} value={category.value}>
                                {category.name}
                              </option>
                            ))}
                          </Select>
                        )}
                      </Field>
                    </VStack>

                    <VStack spacing={1} width="full">
                      <Box className="form-info">
                        <label htmlFor="description">Description</label>
                        <div>
                          {errors.description && touched.description
                            ? errors.description
                            : ""}
                        </div>
                      </Box>

                      <Field
                        id="description"
                        name="description"
                        type="text"
                        placeholder="Enter item description"
                        className="formik-field"
                      />
                    </VStack>

                    <VStack spacing={1} width="full">
                      <Box className="form-info">
                        <label htmlFor="locationFound">Location found</label>
                        <div>
                          {errors.locationFound && touched.locationFound
                            ? errors.locationFound
                            : ""}
                        </div>
                      </Box>

                      <Field
                        id="locationFound"
                        name="locationFound"
                        type="text"
                        placeholder="Enter location found"
                        className="formik-field"
                      />
                    </VStack>

                    <VStack width="full">
                      <Box className="form-info">
                        <label htmlFor="dateFound">{`${
                          user?.role === AuthRoles.USER
                            ? "When will you be submitting it to the L&F office?"
                            : "Date submitted"
                        }`}</label>
                        <div>
                          {errors.dateFound && touched.dateFound
                            ? errors.dateFound
                            : ""}
                        </div>
                      </Box>

                      <Field>
                        {({ form }: FieldProps) => (
                          <Box className="date-picker">
                            <DatePicker
                              id="dateFound"
                              name="dateFound"
                              className="date"
                              selected={values.dateFound}
                              onChange={(date) =>
                                form.setFieldValue("dateFound", date)
                              }
                              dateFormat="dd/MM/yyyy"
                              popperPlacement="top-end"
                              placeholderText="DD/MM/YY"
                              maxDate={new Date()}
                              dateFormatCalendar="MMMM"
                              showMonthDropdown
                              showYearDropdown
                              scrollableYearDropdown
                              dropdownMode="select"
                            />

                            <BiCalendar className="calendar" />
                          </Box>
                        )}
                      </Field>
                    </VStack>

                    {type === "edit" && (
                      <VStack spacing={1} width="full" mb={3}>
                        <label htmlFor="status" className="form-info">
                          Status
                        </label>
                        <Field>
                          {({ form }: FieldProps) => (
                            <RadioGroup
                              aria-label="Status"
                              id="status"
                              name="status"
                              colorScheme="primary"
                              onChange={(e) => form.setFieldValue("status", e)}
                              defaultValue={item?.status ?? ItemStatus.UNCLAIMED} // prettier-ignore
                              width="full"
                            >
                              <Stack spacing={5} direction="row">
                                {STATUS.map((status, index) => (
                                  <Radio
                                    key={index}
                                    value={status.value}
                                    defaultChecked={index === 0}
                                  >
                                    {status.name}
                                  </Radio>
                                ))}
                              </Stack>
                            </RadioGroup>
                          )}
                        </Field>
                      </VStack>
                    )}

                    <Field>
                      {({ form }: FieldProps) => (
                        <FileInput
                          id="imageUrl"
                          name="imageUrl"
                          inputState={inputState}
                          setInputState={setInputState}
                        />
                      )}
                    </Field>

                    {user?.role === AuthRoles.USER && (
                      <HStack width="full" justify="space-between">
                        <label htmlFor="status" className="form-info">
                          Is the item currently in your possession?
                        </label>

                        <Field>
                          {({ field }: FieldProps) => (
                            <Switch
                              id="inPossession"
                              name="inPossession"
                              colorScheme="primary"
                              checked={values.inPossession}
                              onChange={field.onChange}
                            />
                          )}
                        </Field>
                      </HStack>
                    )}

                    <ButtonGroup marginTop={2} marginBottom={6} width="full">
                      <Button
                        type="submit"
                        variant="solid"
                        colorScheme="primary"
                        isDisabled={isDisabled}
                        isLoading={isSubmitting}
                      >
                        {`${type === "create" ? "Create" : "Edit"}`}
                      </Button>
                      <Button
                        variant="outline"
                        colorScheme="primary"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </Button>
                    </ButtonGroup>
                  </VStack>
                </Form>
              );
            }}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateItemModal;
