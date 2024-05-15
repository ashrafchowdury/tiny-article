import { useQuery } from "@tanstack/react-query";
import { UserId } from "@/utils/types";
import { MAX_USAGE_LIMIT } from "@/utils/constant";

// constants
const KEY = ["total-usage"];
const RETRY = 3;

export const useTotalUsage = ({ userId }: UserId) => {
  const fetcher = useQuery({
    queryKey: KEY,
    queryFn: async () => {
      const totalUsage = await fetch(`api/${userId}/total-usage`);
      const result = await totalUsage.json();

      return { usage: result.data, reached: result.data >= MAX_USAGE_LIMIT };
    },
    refetchOnWindowFocus: false,
    retry: RETRY,
    enabled: !!userId,
  });

  return fetcher;
};
