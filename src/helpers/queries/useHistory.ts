import { useMutation, useQuery } from "@tanstack/react-query";
import { UserId, POST_TYPE } from "@/utils/types";
import { HistorySchema } from "@/libs/validations";
import axios from "axios";

// constants
const KEY = ["history"];
const RETRY = 3;

export const useFetchHistory = ({ userId }: UserId) => {
  const fetcher = useQuery({
    queryKey: KEY,
    queryFn: async () => {
      const res = await axios.get(`api/${userId}/history`);

      if (res.status >= 400) return;

      const validateData = HistorySchema.safeParse(res.data);

      if (!validateData.success) {
        throw new Error(validateData.error.message);
      }

      return validateData.data;
    },
    refetchOnWindowFocus: false,
    retry: RETRY,
    enabled: !!userId,
  });

  return fetcher;
};

export const useSaveHistory = ({ userId }: UserId) => {
  const updatetor = useMutation({
    mutationKey: KEY,
    mutationFn: async (posts: POST_TYPE[]) => {
      const res = await axios.post(
        `api/${userId}/history`,
        { posts },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status >= 400) return;

      return res.data;
    },
    onError: (error) => {
      console.log("Failed to auto save hsitory", error.message);
    },
    retry: RETRY,
  });

  return updatetor;
};
