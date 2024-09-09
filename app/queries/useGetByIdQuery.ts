import { useQuery, useQueryClient } from '@tanstack/react-query';

import { errorEmitter } from '@/app/utils/eventEmitter';

type Props = {
  apiService: (payload?: any) => Promise<any>;
  enabled: boolean;
  payload: any;
  queryKey: string;
};

export const useGetByIdQuery = (props: Props) => {
  const { apiService, enabled, payload, queryKey } = props;

  const queryClient = useQueryClient();

  const fetchData = async () => {
    try {
      return await apiService(payload);
      // Optionally, you can update the cache here if needed
    } catch (error: any) {
      // Listen for error events
      errorEmitter.emit('error', error);
    }
  };

  const { error, data, isError, isPending, isSuccess, refetch } = useQuery({
    enabled,
    queryKey: [queryKey],
    queryFn: fetchData,
  });

  // Trigger refetch when external state changes
  const triggerRefetch = () => refetch();

  // Cancel queries
  const cancelQuery = () => {
    queryClient.cancelQueries({ queryKey: [queryKey], exact: true });
  };

  return {
    cancelQuery,
    error,
    data,
    isError,
    isPending,
    isSuccess,
    triggerRefetch,
  };
};

export default useGetByIdQuery;
