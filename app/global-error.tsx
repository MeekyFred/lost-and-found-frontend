"use client";

import { GlobalError as GlobalErrorPage } from "@/app/exports/exports";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  return (
    <html>
      <body>
        <GlobalErrorPage error={error} reset={reset} />
      </body>
    </html>
  );
}
