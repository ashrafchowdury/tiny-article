"use client";
import React, { Fragment } from "react";
import PostCard from "@/components/post-card";
import { POST_TYPE } from "@/utils/types";
import { useAuth } from "@clerk/nextjs";
import { useFetchHistory } from "@/helpers/queries/useHistory";
import PostCardSkeleton from "@/components/skeletons/post-card-skeleton";
import { useUpdateBookmark } from "@/helpers/queries/useBookmark";

const History = () => {
  const { userId } = useAuth();
  const history = useFetchHistory({ userId });
  const updateBookmark = useUpdateBookmark({ userId });

  if (history.isError) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center">
        <p className="text-lg text-center">
          Failed To Load History. Please Try Again Later
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-xl font-bold opacity-65 mb-2">History</h1>
      <p className="text-sm w-full md:w-[70%] lg:w-[50%]">
        All generated posts are automatically saved here for 24 hours. You can
        disable this feature from the settings page.
      </p>

      {history.data?.map((value: POST_TYPE[], ind) => (
        <section className="mt-10" key={ind}>
          <p className="text-xs font-medium opacity-70 mb-3">Today</p>
          <div className="w-full flex flex-wrap items-center justify-start">
            {value?.map((item: POST_TYPE) => (
              <Fragment key={item.id}>
                <PostCard
                  data={item}
                  addToBookmark={() => updateBookmark.mutate(item)}
                />
              </Fragment>
            ))}
          </div>
        </section>
      ))}

      {history.isLoading && (
        <section className="mt-10 w-full flex flex-wrap items-center justify-start space-x-3">
          {Array.from({ length: 4 }).map((_, ind) => (
            <Fragment key={ind}>
              <PostCardSkeleton />
            </Fragment>
          ))}
        </section>
      )}
    </>
  );
};

export default History;
