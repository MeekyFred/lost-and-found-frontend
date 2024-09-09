'use client';

import { useEffect } from 'react';

import { errorEmitter } from '@/app/utils/eventEmitter';
import useHandleError from '@/app/hooks/useHandleError';

const ErrorListener: React.FC = () => {
  const handleError = useHandleError();

  useEffect(() => {
    const onError = (error: any) => handleError(error);

    errorEmitter.on('error', onError);

    return () => {
      errorEmitter.off('error', onError);
    };
  }, [handleError]);

  return null;
};

export default ErrorListener;
