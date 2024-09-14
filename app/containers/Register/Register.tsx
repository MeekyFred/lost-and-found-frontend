"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import { Box, Button, VStack } from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaChevronLeft } from "react-icons/fa6";

import useGlobalToast from "@/app/hooks/useGlobalToast";
import { emailRegEx } from "@/app/lib/regex";
import { RegisterSchema } from "@/app/lib/yup";
import usePostQuery from "@/app/queries/usePostQuery";
import { register as registerAPI } from "@/app/services/auth.service";
import { RegisterType } from "@/app/types/auth";
import { validatePassword } from "@/app/utils/utils";

import "./Register.scss";

const initialValues: RegisterType = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
};

function Register() {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const { push } = useRouter();

  const { showToast } = useGlobalToast();

  const handleToggle = () => setIsHidden(!isHidden);

  const { mutateAsync: register } = usePostQuery({
    apiService: registerAPI,
    queryKey: "register",
  });

  async function handleSubmit(data: RegisterType) {
    try {
      const payload = { data };
      const response = await register(payload);

      if (response?.id) {
        showToast(
          "Account created successfully, please verify your email.",
          "success"
        );
        return true;
      } else {
        showToast("An error occurred. Please try again", "error");
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleGoBack() {
    push("/user/login");
  }

  return (
    <div className="app__register">
      <div className="go-back-button-container">
        <button onClick={handleGoBack}>
          <FaChevronLeft width={24} />
          <span>Go Back</span>
        </button>
      </div>

      <h1 className="auth-layout-header">Create your account</h1>
      <p className="auth-layout-subheader">
        Welcome to Lost and Found. Please enter your personal details below to
        create an account.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);

          const updatedValues: RegisterType = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            password: values.password,
          };

          const res = await handleSubmit(updatedValues);

          if (!res) return;

          actions.setSubmitting(false);
          actions.resetForm();

          push("/user/login");
        }}
      >
        {({ dirty, errors, touched, isValid, isSubmitting, values }) => {
          // const emailValid = emailRegEx.test(values.email);
          // const phoneIsValid = isValidPhoneNumber(phoneString);
          // const passwordValidator = validatePassword(values.password);
          // const stepDisabled = !phoneIsValid || !emailValid;

          const isDisabled = isSubmitting || !isValid || !dirty; // prettier-ignore

          return (
            <Form>
              <VStack align="flex-start" spacing={3} width="full">
                <VStack spacing={1} width="full">
                  <Box className="form-info">
                    <label htmlFor="firstName">First name</label>
                    <div>
                      {errors.firstName && touched.firstName
                        ? errors.firstName
                        : ""}
                    </div>
                  </Box>

                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter first name"
                    className="formik-field"
                  />
                </VStack>

                <VStack spacing={1} width="full">
                  <Box className="form-info">
                    <label htmlFor="lastName">Last name</label>
                    <div>
                      {errors.lastName && touched.lastName
                        ? errors.lastName
                        : ""}
                    </div>
                  </Box>

                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter last name"
                    className="formik-field"
                  />
                </VStack>

                <VStack spacing={1} width="full">
                  <Box className="form-info">
                    <label htmlFor="email">Email address</label>
                    <div>
                      {errors.email && touched.email ? errors.email : ""}
                    </div>
                  </Box>

                  <Field
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter email address"
                    className="formik-field"
                  />
                </VStack>

                <VStack spacing={1} width="full">
                  <Box className="form-info">
                    <label htmlFor="phoneNumber">Phone number</label>
                    <div>
                      {errors.phoneNumber && touched.phoneNumber
                        ? errors.phoneNumber
                        : ""}
                    </div>
                  </Box>

                  <Field
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="Enter phone number"
                    className="formik-field"
                  />
                </VStack>

                <VStack spacing={1} width="full">
                  <Box className="form-info">
                    <label htmlFor="password">Password</label>
                    <div>
                      {errors.password && touched.password
                        ? errors.password
                        : ""}
                    </div>
                  </Box>

                  <div className="input-group">
                    <Field
                      id="password"
                      type={isHidden ? "password" : "text"}
                      name="password"
                      placeholder="**********"
                    />
                    {isHidden ? (
                      <AiOutlineEye
                        data-testid="password-toggle-icon-show"
                        onClick={handleToggle}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        data-testid="password-toggle-icon-hide"
                        onClick={handleToggle}
                      />
                    )}
                  </div>
                </VStack>

                <Button
                  type="submit"
                  colorScheme="primary"
                  isDisabled={isDisabled}
                  isLoading={isSubmitting}
                  loadingText="Signing up..."
                  variant="solid"
                  width="full"
                >
                  Create account
                </Button>
              </VStack>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Register;
