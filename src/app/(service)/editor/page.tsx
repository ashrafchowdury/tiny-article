"use client";
import { Fragment, useState } from "react";
import { SendHorizontal, Eraser } from "lucide-react";
import { Button } from "@/components/ui";
import PostCard from "@/components/post-card";
import PostCardSkeleton from "@/components/skeletons/post-card-skeleton";
import { POST_TYPE } from "@/utils/types";
import { useAuth } from "@clerk/nextjs";
import { useUpdateBookmark } from "@/libs/queries/useBookmark";
import { useSaveHistory } from "@/libs/queries/useHistory";
import { useMutation } from "@tanstack/react-query";
import { useFetchCustomPrompt } from "@/libs/queries/useCustomPrompt";
import { toast } from "sonner";

const Editor = () => {
  const [url, setUrl] = useState("");
  const [article, setArticle] = useState("");

  // chustom hooks
  const { userId } = useAuth();
  const updateBookmark = useUpdateBookmark({ userId });
  const saveHistory = useSaveHistory({ userId });
  const userPrompt = useFetchCustomPrompt({ userId });

  // query
  const { isPending, data, mutate, isError, reset } = useMutation({
    mutationKey: ["new-posts"],
    mutationFn: async (prompt: string) => {
      const res = await fetch("/api/generator", {
        method: "POST",
        body: JSON.stringify({ prompt, userPrompt: userPrompt.data }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      const refinedData = JSON.parse(data.data.replace("```json", "").replace("```", ""));

      return refinedData;
    },
    onSuccess: (data) => {
     userPrompt.data.isAutoSavePost && saveHistory.mutate(data);
    },
    onError: () => {
      toast.error("Encounter error. Please try again later");
    },
  });

  return (
    <>
      <h1 className="text-xl font-bold opacity-65 mb-2">Generate Posts</h1>
      <p className="text-sm w-[50%]">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, quae iusto. Molestiae sint asperiores
        numquam magnam aliquam tenetur vel consequuntur!
      </p>

      <section className="mt-10">
        <label htmlFor="" className="text-sm font-medium opacity-70">
          Article URL
        </label>
        <div className="w-full mt-2 mb-5 relative">
          <input
            type="text"
            placeholder="Add article URL here..."
            className="w-full py-2 px-3 rounded-md bg-input outline-none"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Button
            size="icon"
            className="w-8 h-8 bg-primary absolute top-[4px] right-[5px]"
            disabled={isPending || Boolean(article) || !Boolean(url)}
          >
            <SendHorizontal className="w-4 h-4" />
          </Button>
        </div>

        <label htmlFor="" className="text-sm font-medium opacity-70">
          Past Article Here
        </label>

        <div className="w-full mt-2 relative">
          <textarea
            className="w-full h-[300px] pt-3 pb-14 px-3 rounded-md bg-input outline-none"
            placeholder="Past your article here..."
            onChange={(e) => setArticle(e.target.value)}
            value={article}
          ></textarea>

          <div className="h-[55px] bg-transparent border-t z-20 absolute bottom-2 left-0.5 right-0.5 flex items-center justify-end px-3 space-x-2">
            <Button
              className="py-1 text-sm"
              variant="outline"
              disabled={isPending || Boolean(url) || !Boolean(article)}
              onClick={() => setArticle("")}
            >
              Clear
              <Eraser className="w-3 h-3 ml-2" />
            </Button>
            <Button
              className="!py-1 bg-primary text-sm font-semibold"
              disabled={isPending || Boolean(url) || !Boolean(article)}
              onClick={() => {
                reset();
                mutate(article);
              }}
            >
              Generate
              <SendHorizontal className="w-3 h-3 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {data && (
        <section className="mt-10">
          <h2 className="text-xl font-bold opacity-65 mb-5">Posts</h2>

          <div className="w-full flex flex-wrap items-center justify-start">
            {data.map((item: POST_TYPE) => (
              <Fragment key={item.id}>
                <PostCard data={item} addToBookmark={() => updateBookmark.mutate(item)} />
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
