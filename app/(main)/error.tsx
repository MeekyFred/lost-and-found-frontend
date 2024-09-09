'use client';

import { useEffect } from 'react';

import { GlobalError } from '@/app/exports/exports';
import useHandleError from '@/app/hooks/useHandleError';
import { errorEmitter } from '@/app/utils/eventEmitter';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const handleError = useHandleError();

  useEffect(() => {
    const onError = () => handleError(error);

    errorEmitter.on('error', onError);
    console.log(error);

    return () => {
      errorEmitter.off('error', onError);
    };
  }, [error, handleError]);

  return (
    <div>
      <GlobalError error={error} reset={reset} />
    </div>
  );
}
