"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { Button, IconButton, VStack } from "@chakra-ui/react";
import { IoMailOutline } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { setCookie } from "cookies-next";

import { images } from "@/app/constants";
import { LoginSchema } from "@/app/lib/yup";
import usePostQuery from "@/app/queries/usePostQuery";
import { userLogin as userLoginAPI } from "@/app/services/auth.service";
import { LoginType, User } from "@/app/types/auth";
import { updateToken } from "@/app/utils/axios";
import { decodeJWT } from "@/app/utils/utils";
import { useStore } from "@/app/zustand/store/useStore";

import "./Login.scss";

const initialValues: LoginType = { email: "", password: "" };

function Login() {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { push } = useRouter();
  const { setIsLoggedIn, setUser } = useStore();

  const handleToggle = () => setIsHidden(!isHidden);

  function headToSignup() {
    push("/user/register");
  }

  const {
    data,
    isPending,
    isSuccess,
    mutateAsync: userLogin,
  } = usePostQuery({
    apiService: userLoginAPI,
    queryKey: "user-login",
  });

  const decodeToken = (jwtToken: string) => {
    if (jwtToken !== undefined) {
      const decodedToken = decodeJWT(jwtToken);
      return decodedToken;
    }
  };

  const handleRedirect = async (token: string) => {
    if (!token) return;

    const payload = decodeToken(token);

    const userData: User = {
      id: payload?.id,
      firstName: payload?.firstName,
      lastName: payload?.lastName,
      email: payload?.email,
      phoneNumber: payload?.phoneNumber,
      role: payload?.role,
    };

    setUser(userData);
    setIsLoggedIn(true);

    setCookie("role", userData.role, {
      path: "/",
      sameSite: true,
      secure: true,
    });

    setCookie("token", true, {
      path: "/",
      sameSite: true,
      secure: true,
    });

    push("/user/items");
  };

  async function handleSubmit(data: any) {
    setIsLoading(true);

    try {
      const payload = { data };
      const { accessToken, refreshToken } = await userLogin(payload);

      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      updateToken(accessToken);
      handleRedirect(accessToken);

      return accessToken !== undefined ? true : false;
    } catch (error: any) {
      setIsLoading(false);
    }
  }

  const handleGoHome = () => push("/");

  return (
    <div className="app__login">
      <Image src={images.logo128} alt="sidebar-logo" className="logo" />

      <div className="app__auth-layout-account-prompt desktop">
        <IconButton
          aria-label="home"
          colorScheme="primary"
          variant="ghost"
          size="lg"
          icon={<FaHome />}
          onClick={handleGoHome}
        />

        <p>I don’t have an account?</p>

        <Button
          onClick={headToSignup}
          type="submit"
          colorScheme="primary"
          loadingText="Signing in..."
          variant="outline"
        >
          Sign Up
        </Button>
      </div>

      <h1 className="auth-layout-header">Welcome back</h1>
      <p className="auth-layout-subheader">
        Enter your credentials below to sign in to your account
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);

          const updatedValues: LoginType = {
            email: values.email,
            password: values.password,
          };

          const res = await handleSubmit(updatedValues);

          if (!res) return;

          actions.setSubmitting(false);
          actions.resetForm();
        }}
      >
        {({ dirty, errors, touched, isSubmitting, isValid, values }) => {
          const isEmpty = Object.values(values).some(value => value === ""); // prettier-ignore
          const isDisabled = isSubmitting || !isValid || isEmpty || !dirty;

          return (
            <Form>
              <VStack>
                <div className="form-info">
                  <label htmlFor="email" aria-labelledby="email">
                    Email address
                  </label>
                  <div>{errors.email && touched.email ? errors.email : ""}</div>
                </div>

                <div className="input-group">
                  <Field
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Enter email"
                  />
                  <IoMailOutline />
                </div>

                <div className="form-info">
                  <label htmlFor="password">Password</label>
                  <div>
                    {errors.password && touched.password ? errors.password : ""}
                  </div>
                </div>

                <div className="input-group">
                  <Field
                    id="password"
                    type={isHidden ? "password" : "text"}
                    name="password"
                    placeholder="Enter password"
                  />
                  {isHidden ? (
                    <AiOutlineEye onClick={handleToggle} />
                  ) : (
                    <AiOutlineEyeInvisible onClick={handleToggle} />
                  )}
                </div>

                {/* <div className="bottom-section">
                  <Link href="/forgot-password">Forgot password?</Link>
                </div> */}

                <Button
                  type="submit"
                  colorScheme="primary"
                  isDisabled={isDisabled}
                  isLoading={isSubmitting || isLoading}
                  loadingText="Signing in..."
                  variant="solid"
                  width="full"
                >
                  Sign in
                </Button>
              </VStack>
            </Form>
          );
        }}
      </Formik>

      <div className="app__auth-layout-account-prompt mobile">
        <IconButton
          aria-label="home"
          colorScheme="primary"
          variant="ghost"
          size="lg"
          icon={<FaHome />}
          onClick={handleGoHome}
        />

        <p>I don’t have an account?</p>

        <Button
          onClick={headToSignup}
          type="submit"
          colorScheme="primary"
          loadingText="Signing in..."
          variant="outline"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default Login;
