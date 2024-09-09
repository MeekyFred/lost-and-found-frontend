import { useQuery } from '@tanstack/react-query';

import { errorEmitter } from '@/app/utils/eventEmitter';

type Props = {
  apiService: (payload: any) => Promise<any>;
  pagination?: any;
  enabled: boolean;
  search?: string;
  status?: string;
  queryKey: string;
};

export const useGetPaginatedQuery = (props: Props) => {
  const { apiService, enabled, pagination } = props;
  const { queryKey, search, status } = props;

  const fetchPaginatedData = async () => {
    try {
      const payload = { ...pagination, search, status };

      if (enabled) {
        return await apiService(payload);
      } else {
        return null;
      }

      // Optionally, you can update the cache here if needed
    } catch (error: any) {
      // Listen for error events
      errorEmitter.emit('error', error);
    }
  };

  const { data, error, isError, isPending, isSuccess, refetch } = useQuery({
    enabled,
    queryKey: [queryKey],
    queryFn: fetchPaginatedData,
  });

  // Trigger refetch when external state changes
  const triggerRefetch = () => refetch();

  return { data, error, isError, isPending, isSuccess, triggerRefetch };
};

export default useGetPaginatedQuery;
