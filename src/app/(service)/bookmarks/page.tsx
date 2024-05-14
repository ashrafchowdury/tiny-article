"use client";
import React, { Fragment } from "react";
import PostCard from "@/components/post-card";
import { POST_TYPE } from "@/utils/types";
import { useAuth } from "@clerk/nextjs";
import PostCardSkeleton from "@/components/skeletons/post-card-skeleton";
import {
  useDeleteBookmark,
  useFetchBookmarks,
} from "@/libs/queries/useBookmark";

const Bookmarks = () => {
  const { userId } = useAuth();
  const deletBookmark = useDeleteBookmark({ userId });
  const bookmark = useFetchBookmarks({ userId });

  return (
    <>
      <h1 className="text-2xl font-bold opacity-65 mb-2">Bookmark Posts</h1>
      <p className="text-sm w-full md:w-[70%] lg:w-[50%]">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur,
        quae iusto.
      </p>

      <section className="w-full flex flex-wrap items-center justify-start mt-10">
        {bookmark.data?.map((item: POST_TYPE) => (
          <Fragment key={item.id}>
            <PostCard
              data={item}
              type="bookmark"
              removeFromBookmark={() => deletBookmark.mutate(item.id)}
            />
          </Fragment>
        ))}

        {bookmark.isError && (
          <p className="text-lg text-center">
            Failed To Load Bookmarks. Please Try Again Later
          </p>
        )}

        {bookmark.isLoading && (
          <>
            {Array.from({ length: 4 }).map((_, ind) => (
              <Fragment key={ind}>
                <PostCardSkeleton />
              </Fragment>
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default Bookmarks;
