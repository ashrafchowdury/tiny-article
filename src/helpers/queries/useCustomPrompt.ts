import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/libs/query";
import { UserId, CUSTOM_PROMPT_TYPE } from "@/utils/types";
import { toast } from "sonner";
import { CustomPromptSchema } from "@/libs/validations";
import axios from "axios";

// constants
const KEY = ["custom-prompt"];
const RETRY = 3;

export const useFetchCustomPrompt = ({ userId }: UserId) => {
  const fetcher = useQuery({
    queryKey: KEY,
    queryFn: async () => {
      const res = await axios.get(`api/${userId}/custom-prompt`);

      if (res.statusText !== "OK") return;

      const validateData = CustomPromptSchema.safeParse(res.data);

      if (!validateData.success) {
        throw new Error(validateData.error.message);
        return;
      }

      return validateData.data;
    },
    refetchOnWindowFocus: false,
    retry: RETRY,
    enabled: !!userId,
  });

  return fetcher;
};

export const useUpdateCustomPrompt = ({ userId }: UserId) => {
  const updatetor = useMutation({
    mutationKey: KEY,
    mutationFn: async (data: CUSTOM_PROMPT_TYPE) => {
      const res = await axios.post(`api/${userId}/custom-prompt`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.statusText !== "OK") return;

      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(KEY, (prevData: CUSTOM_PROMPT_TYPE) => data);
      toast("✅ Updated propmt settings successfully");
    },
    onError: () => {
      toast.error("❌ Failed to save settings, please try again later");
    },
    retry: RETRY,
  });

  return updatetor;
};
