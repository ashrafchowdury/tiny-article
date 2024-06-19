import { useQuery } from "@tanstack/react-query";
import { UserId } from "@/utils/types";
import { MAX_USAGE_LIMIT } from "@/utils/constant";
import axios from "axios";

// constants
const KEY = ["total-usage"];
const RETRY = 3;

export const useTotalUsage = ({ userId }: UserId) => {
  const fetcher = useQuery({
    queryKey: KEY,
    queryFn: async () => {
      const res = await axios.get(`api/${userId}/total-usage`);

      if (res.status >= 400) return;

      return { usage: res.data, reached: res.data >= MAX_USAGE_LIMIT };
    },
    refetchOnWindowFocus: false,
    retry: RETRY,
    enabled: !!userId,
  });

  return fetcher;
};
