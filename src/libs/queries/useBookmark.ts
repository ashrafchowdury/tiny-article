import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/libs/query";
import { POST_TYPE, UserId } from "@/utils/types";
import { toast } from "sonner";
import { PostsSchema } from "../validations";

// constants
const KEY = ["bookmarks"];
const RETRY = 3;

export const useFetchBookmarks = ({ userId }: UserId) => {
  const fetcher = useQuery({
    queryKey: KEY,
    queryFn: async () => {
      const data = await fetch(`api/${userId}/bookmarks`);
      const result = await data.json();

      const validateData = PostsSchema.safeParse(result.data);

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

export const useUpdateBookmark = ({ userId }: UserId) => {
  const updatetor = useMutation({
    mutationKey: KEY,
    mutationFn: async (data: POST_TYPE) => {
      await fetch(`api/${userId}/bookmarks`, {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(KEY, (prevData: POST_TYPE[]) => [
        ...prevData,
        data,
      ]);
      toast("✅ Bookmaked the post");
    },
    onError: () => {
      toast.error("❌ Failed to save post, please try again later");
    },
    retry: RETRY,
  });

  return updatetor;
};

export const useDeleteBookmark = ({ userId }: UserId) => {
  const dispatcher = useMutation({
    mutationKey: KEY,
    mutationFn: async (postId: string) => {
      await fetch(`api/${userId}/bookmarks`, {
        method: "DELETE",
        body: JSON.stringify({ postId: postId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return postId;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(KEY, (prevData: POST_TYPE[]) =>
        prevData.filter((item) => item.id !== data)
      );
      toast("✅ Removed post from bookmark");
    },
    onError: () => {
      toast.error("❌ Failed to delete bookmark, please try again later");
    },
    retry: RETRY,
  });

  return dispatcher;
};
