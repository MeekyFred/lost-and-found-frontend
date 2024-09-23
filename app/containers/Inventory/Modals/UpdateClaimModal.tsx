"use client";

import React from "react";
import type { FC } from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { ModalHeader, ModalBody } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useBreakpointValue, VStack } from "@chakra-ui/react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";

import { STATUS } from "@/app/helpers/claims";
import useGlobalToast from "@/app/hooks/useGlobalToast";
import usePostQuery from "@/app/queries/usePostQuery";
import { UpdateClaimSchema } from "@/app/lib/yup";
import { updateClaim as updateClaimAPI } from "@/app/services/admin.service";
import { Claim, ClaimStatus, CreateClaimFormikData } from "@/app/types/claim";

import "./UpdateClaimModal.scss";

type Props = {
  claim: Claim;
  isOpen: boolean;
  handleClose: () => void;
  refreshPage: () => void;
};

const UpdateClaimModal: FC<Props> = (props) => {
  const { claim, handleClose, isOpen, refreshPage } = props;

  const { showToast } = useGlobalToast();

  const InitialValues: CreateClaimFormikData = {
    status: claim.status,
  };

  const { mutateAsync: updateClaim } = usePostQuery({
    apiService: updateClaimAPI,
    queryKey: "updateClaim",
  });

  const modalSize = useBreakpointValue({ base: "sm", md: "md" });

  const handleSubmit = async (formData: CreateClaimFormikData) => {
    const data = {
      id: claim.id,
      status: formData.status,
    };

    const payload = { data };

    const response = await updateClaim(payload);

    if (response?.success) {
      showToast(response.message, "success");
      return response?.success;
    }

    return false;
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
      <ModalContent data-testid="order-modal" className="app__modal__content">
        <ModalHeader className="app__modal__header">
          <div className="app__modal__header-group">
            <h2>Update claim</h2>

            <div className="close__modal__btn" onClick={handleClose}>
              <AiOutlineClose />
            </div>
          </div>
        </ModalHeader>

        <ModalBody className="update__claim__modal__body" title="modal-body">
          <Formik
            initialValues={InitialValues}
            validationSchema={UpdateClaimSchema}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(true);

              const updatedValues: CreateClaimFormikData = {
                status: values.status,
              };

              const res = await handleSubmit(updatedValues);

              if (!res) return;

              refreshPage();
              handleClose();
              actions.setSubmitting(false);
              actions.resetForm();
            }}
          >
            {({ isSubmitting, isValid }) => {
              const isDisabled = isSubmitting || !isValid;

              return (
                <Form>
                  <VStack align="flex-start" spacing={3} width="full">
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
                            defaultValue={claim?.status ?? ClaimStatus.SUBMITTED} // prettier-ignore
                            width="full"
                          >
                            <Stack spacing={5} direction="row">
                              {STATUS.map((status, index) => (
                                <Radio
                                  key={index}
                                  value={status.value}
                                  defaultChecked={status.value === claim.status}
                                >
                                  {status.name}
                                </Radio>
                              ))}
                            </Stack>
                          </RadioGroup>
                        )}
                      </Field>
                    </VStack>

                    <ButtonGroup marginTop={2} marginBottom={6} width="full">
                      <Button
                        type="submit"
                        variant="solid"
                        colorScheme="primary"
                        isDisabled={isDisabled}
                        isLoading={isSubmitting}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outline"
                        colorScheme="primary"
                        onClick={handleClose}
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

export default UpdateClaimModal;
