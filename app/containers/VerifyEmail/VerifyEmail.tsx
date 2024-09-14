"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";

import { images } from "@/app/constants";

import usePostQuery from "@/app/queries/usePostQuery";
import { verifyEmailLink as verifyEmailLinkAPI } from "@/app/services/auth.service";
import { updateToken } from "@/app/utils/axios";

import "./VerifyEmail.scss";

interface Props {
  params: { token: string; email: string };
}

function VerifyEmail({ params }: Props) {
  const [verifying, setVerifying] = useState(true);

  const { push } = useRouter();

  const { data, mutateAsync: verifyEmailLink } = usePostQuery({
    apiService: verifyEmailLinkAPI,
    queryKey: "verifyEmailLink",
  });

  async function handleVerifyEmailLink() {
    const isEmailVerifed = await verifyEmailLink({
      data: {
        token: params.token,
        email: params.email,
      },
    });

    isEmailVerifed && setVerifying(false);
  }

  useEffect(() => {
    if (params.token && params.email) {
      handleVerifyEmailLink();
    }
  }, [params]); // eslint-disable-line

  function handleProceed() {
    if (data) {
      updateToken(params.token);
      push("/user/login");
    }
  }

  return (
    <div className="app__verify-email">
      {!verifying && data && (
        <>
          <div className="verify-email-wrapper">
            <Image
              src={images.successBlueTickIcon}
              alt="email-icon"
              className="image-illustration"
            />

            <h1 className="auth-layout-header">Email verified successfully</h1>
            <p className="auth-layout-subheader">
              Congratulations, your email has been successfully verified, click
              on the button below to login
            </p>

            <div className="button-wrapper">
              <Button
                type="submit"
                colorScheme="primary"
                loadingText="Signing in..."
                variant="solid"
                onClick={handleProceed}
              >
                Proceed
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default VerifyEmail;
