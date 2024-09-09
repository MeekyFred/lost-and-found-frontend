'use client';

import { useCallback } from 'react';

import useGlobalToast from './useGlobalToast';
import useHandleLogout from './useHandleLogout';

const useHandleError = () => {
  const { showToast, updateToast, toast } = useGlobalToast();
  const { handleLogout } = useHandleLogout();

  const handleError = useCallback(
    (error: any) => {
      let message = error?.message;

      const condition = navigator?.onLine ? 'online' : 'offline';
      const status = error?.response?.status;
      const data = error?.response?.data;
      const isString = typeof data?.message === 'string';

      if (status === 401) {
        handleLogout();
        return;
      }

      if (data) {
        const errorMessage = isString ? data?.message : data?.message?.[0]; // prettier-ignore
        if (errorMessage) message = errorMessage;
      }

      if (condition === 'offline') {
        message = 'Please check your internet connection.';
      }

      toast.isActive('global-toast')
        ? updateToast(message, 'error')
        : showToast(message, 'error');

      console.error(message);
    },
    [toast] // eslint-disable-line
  );

  return handleError;
};

export default useHandleError;
