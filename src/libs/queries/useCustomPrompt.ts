import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/libs/query";
import { UserId, PROMPT_UTILITIES } from "@/utils/types";
import { toast } from "sonner";

// types
type CustomPrompt = {
  prompt: string;
  voice: string;
  utilities: PROMPT_UTILITIES;
};

// constants
const KEY = ["custom-prompt"];
const RETRY = 3;

export const useFetchCustomPrompt = ({ userId }: UserId) => {
  const fetcher = useQuery({
    queryKey: KEY,
    queryFn: async () => {
      const data = await fetch(`api/${userId}/custom-prompt`);
      const result = await data.json();
      return result.data;
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
    mutationFn: async (data: CustomPrompt) => {
      const res = await fetch(`api/${userId}/custom-prompt`, {
        method: "POST",
        body: JSON.stringify({ prompt: data.prompt, voice: data.voice, utilities: data.utilities }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(KEY, (prevData: CustomPrompt) => data);
      toast("✅ Updated propmt settings successfully");
    },
    onError: () => {
      toast.error("❌ Failed to save settings, please try again later");
    },
    retry: RETRY,
  });

  return updatetor;
};
