import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/libs/query";
import { UserId, CUSTOM_PROMPT_TYPE } from "@/utils/types";
import { toast } from "sonner";
import { CustomPromptSchema } from "@/libs/validations";

// constants
const KEY = ["custom-prompt"];
const RETRY = 3;

export const useFetchCustomPrompt = ({ userId }: UserId) => {
  const fetcher = useQuery({
    queryKey: KEY,
    queryFn: async () => {
      const data = await fetch(`api/${userId}/custom-prompt`);
      const result = await data.json();

      const validateData = CustomPromptSchema.safeParse(result.data);

      if (!validateData.success) {
        console.log(validateData.error.message);
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
      const res = await fetch(`api/${userId}/custom-prompt`, {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      return result.data;
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
