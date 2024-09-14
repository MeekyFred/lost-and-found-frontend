import { redirect } from "next/navigation";
import React from "react";

import { VerifyEmail } from "@/app/exports/exports";

interface Props {
  searchParams: { token: string; email: string };
}

function VerifyEmailPage({ searchParams }: Props) {
  const params = searchParams;

  return (
    <>
      {params?.email && params?.token ? (
        <VerifyEmail params={params} />
      ) : (
        redirect("/user/login")
      )}
    </>
  );
}

export default VerifyEmailPage;
