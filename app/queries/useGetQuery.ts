import { useQuery } from '@tanstack/react-query';

import { errorEmitter } from '@/app/utils/eventEmitter';

type Props = {
  apiService: (payload?: any) => Promise<any>;
  enabled?: boolean;
  payload?: any;
  queryKey: string;
};

export const useGetQuery = (props: Props) => {
  const { apiService, enabled, payload, queryKey } = props;

  const fetchData = async () => {
    try {
      return payload ? await apiService(payload) : await apiService();
      // Optionally, you can update the cache here if needed
    } catch (error: any) {
      // Listen for error events
      errorEmitter.emit('error', error);
    }
  };

  const { data, error, isError, isPending, isSuccess, refetch } = useQuery({
    enabled,
    queryKey: [queryKey],
    queryFn: fetchData,
  });

  // Trigger refetch when external state changes
  const triggerRefetch = () => refetch();

  return { data, error, isError, isPending, isSuccess, triggerRefetch };
};

export default useGetQuery;
