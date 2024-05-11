import { useMutation, useQuery } from "@tanstack/react-query";
import { UserId, POST_TYPE } from "@/utils/types";
import { HistorySchema } from "@/libs/validations";

// constants
const KEY = ["history"];
const RETRY = 3;

export const useFetchHistory = ({ userId }: UserId) => {
  const fetcher = useQuery({
    queryKey: KEY,
    queryFn: async () => {
      const data = await fetch(`api/${userId}/history`);
      const result = await data.json();

      const validateData = HistorySchema.safeParse(result.data);

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
      const res = await fetch(`api/${userId}/history`, {
        method: "POST",
        body: JSON.stringify({ posts }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      return result.data;
    },
    onError: (error) => {
      console.log("Failed to auto save hsitory", error.message);
    },
    retry: RETRY,
  });

  return updatetor;
};
