import { useQuery } from "@tanstack/react-query";

import { errorEmitter } from "@/app/utils/eventEmitter";

type Props = {
  apiService: (payload: any) => Promise<any>;
  payload: object;
  enabled: boolean;
  queryKey: string;
};

export const useGetPaginatedQuery = (props: Props) => {
  const { apiService, enabled, payload, queryKey } = props;

  const fetchPaginatedData = async () => {
    try {
      const data = { ...payload };

      if (enabled) {
        return await apiService(data);
      } else {
        return null;
      }

      // Optionally, you can update the cache here if needed
    } catch (error: any) {
      // Listen for error events
      errorEmitter.emit("error", error);
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
