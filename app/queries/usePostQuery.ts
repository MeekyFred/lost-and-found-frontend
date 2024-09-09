import { useMutation, useQueryClient } from '@tanstack/react-query';

import { errorEmitter } from '@/app/utils/eventEmitter';

type Props = {
  apiService: (payload: object) => Promise<any>;
  queryKey: string;
};

const usePostQuery = ({ apiService, queryKey }: Props) => {
  const queryClient = useQueryClient();

  const requestFn = async (payload: object) => {
    try {
      return await apiService(payload);
    } catch (error: any) {
      // Listen for error events
      errorEmitter.emit('error', error);
    }
  };

  const { data, error, isError, isPending, isSuccess, mutateAsync, reset } =
    useMutation({
      mutationFn: (payload: object) => requestFn(payload),
      onSuccess: () => {
        // Invalidate and refresh
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
      onError: (error: any) => {
        // Listen for error events
        errorEmitter.emit('error', error);
      },
    });

  return { data, error, isError, isPending, isSuccess, mutateAsync, reset };
};

export default usePostQuery;
