"use client";
import { Fragment, useState } from "react";
import { SendHorizontal, Eraser } from "lucide-react";
import { Button } from "@/components/ui";
import PostCard from "@/components/post-card";
import PostCardSkeleton from "@/components/skeletons/post-card-skeleton";
import { POST_TYPE } from "@/utils/types";
import { useAuth } from "@clerk/nextjs";
import { useUpdateBookmark } from "@/helpers/queries/useBookmark";
import { useSaveHistory } from "@/helpers/queries/useHistory";
import { useMutation } from "@tanstack/react-query";
import { useFetchCustomPrompt } from "@/helpers/queries/useCustomPrompt";
import { useTotalUsage } from "@/helpers/queries/useLimit";
import { toast } from "sonner";
import { PostsSchema } from "@/libs/validations";
import { queryClient } from "@/libs/query";
import axios from "axios";

type PROMPT_TYPE = { prompt: string; type: "url" | "article" };

const Editor = () => {
  const [url, setUrl] = useState("");
  const [article, setArticle] = useState("");

  // chustom hooks
  const { userId } = useAuth();
  const updateBookmark = useUpdateBookmark({ userId });
  const saveHistory = useSaveHistory({ userId });
  const userPrompt = useFetchCustomPrompt({ userId });
  const limit = useTotalUsage({ userId });

  // query
  const { isPending, data, mutate, isError, reset } = useMutation({
    mutationKey: ["new-posts"],
    mutationFn: async (data: PROMPT_TYPE) => {
      const res = await axios.post(
        "/api/generator",
        { ...data, userPrompt: userPrompt.data, userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status >= 400) {
        throw new Error("Encounter error while triyng to generate posts");
      }

      const refinedData = JSON.parse(
        res.data.replace("```json", "").replace("```", "")
      );

      const validateData = PostsSchema.safeParse(refinedData);

      if (!validateData.success) {
        throw new Error(validateData.error.message);
      }

      return validateData.data;
    },
    onSuccess: (data: POST_TYPE[]) => {
      userPrompt.data?.isAutoSavePost && saveHistory.mutate(data);
      queryClient.setQueryData(["total-usage"], () => limit.data?.usage + 1);

      setUrl("");
      setArticle("");
    },
    onError: () => {
      toast.error("Encounter error. Please try again later");
    },
  });

  const onSubmit = (prompt: PROMPT_TYPE) => {
    if (limit.data?.reached) return;

    if (data && data?.length > 0) {
      reset();
    }

    mutate(prompt);
  };

  return (
    <>
      <h1 className="text-xl font-bold opacity-65 mb-2">Generate Posts</h1>
      <p className="text-sm w-full md:w-[70%] lg:w-[50%]">
        To generate posts ready for social media, use the link to the article or
        copy the entire article and paste it here.
      </p>

      <section className="mt-10">
        <label htmlFor="url" className="text-sm font-medium opacity-70">
          Article URL
        </label>
        <div className="w-full mt-2 mb-5 relative">
          <input
            type="text"
            placeholder="Add article URL here..."
            className="w-full py-2.5 px-4 rounded-md bg-input outline-none text-sm"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Button
            size="icon"
            className="w-8 h-8 bg-primary absolute top-[4px] right-[5px]"
            disabled={isPending || Boolean(article) || !Boolean(url)}
            onClick={() => onSubmit({ prompt: url, type: "url" })}
          >
            <SendHorizontal className="w-4 h-4" />
          </Button>
        </div>

        <label htmlFor="article" className="text-sm font-medium opacity-70">
          Past Article Here
        </label>

        <div className="w-full mt-2 relative">
          <textarea
            className="w-full h-[220px] sm:h-[250px] lg:h-[300px] pt-4 pb-14 px-4 rounded-md bg-input outline-none text-sm"
            placeholder="Past your article here..."
            onChange={(e) => setArticle(e.target.value)}
            value={article}
            disabled={limit.data?.reached}
          ></textarea>

          <div className="h-[50px] lg:h-[55px] bg-input border-t z-20 absolute bottom-1.5 left-0.5 right-0.5 flex items-center justify-between px-3">
            <p className="text-xs md:text-sm opacity-80">
              Length: {article.length}
            </p>

            <div className="flex items-center space-x-2">
              <Button
                className="text-xs lg:text-sm"
                variant="outline"
                disabled={isPending || Boolean(url) || !Boolean(article)}
                onClick={() => setArticle("")}
              >
                Clear
                <Eraser className="w-3 h-3 ml-2 hidden sm:block" />
              </Button>
              <Button
                className="text-xs lg:text-sm font-semibold"
                disabled={isPending || Boolean(url) || !Boolean(article)}
                onClick={() => onSubmit({ prompt: article, type: "article" })}
              >
                {isPending ? "Generating" : "Generate"}
                <SendHorizontal className="w-3 h-3 ml-2 hidden sm:block" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {data && (
        <section className="w-full mt-10">
          <h2 className="text-xl font-bold opacity-65 mb-3">Posts</h2>

          <div className="w-full flex flex-wrap items-center justify-start">
            {data.map((item: POST_TYPE) => (
              <Fragment key={item.id}>
                <PostCard
                  data={item}
                  addToBookmark={() => updateBookmark.mutate(item)}
                  className="mx-1"
                />
              </Fragment>
            ))}
          </div>
        </section>
      )}

      {isError && (
        <section className="w-full mt-20 flex items-center justify-center">
          <p className="text-lg text-center">Failed To Generate Posts</p>
        </section>
      )}

      {limit.data?.reached && (
        <section className="w-full mt-20 flex items-center justify-center">
          <p className="text-lg text-center">
            You have reached your daily limit
          </p>
        </section>
      )}

      {isPending && (
        <section className="mt-10">
          <h2 className="text-xl font-bold opacity-65 mb-5">Posts</h2>
          <div className="w-full flex items-center justify-between">
            {Array.from({ length: 4 }).map((_, ind) => (
              <Fragment key={ind}>
                <PostCardSkeleton />
              </Fragment>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Editor;
