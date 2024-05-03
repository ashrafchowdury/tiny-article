"use client";
import React, { Fragment, useState, useEffect } from "react";
import PostCard from "@/components/post-card";
import { POST_TYPE } from "@/utils/types";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<POST_TYPE[]>([]);
  const { userId } = useAuth();

  const getBookmarks = async () => {
    try {
      const data = await fetch(`api/${userId}/bookmarks`);

      const result = await data.json();
      setBookmarks(result.data);
    } catch (error) {
      toast.error("Unable to fetch saved bookmarks, Please try again later");
    }
  };

  const removePost = async (postId: string) => {
    try {
      if (!postId) return;

      await fetch(`api/${userId}/bookmarks`, {
        method: "DELETE",
        body: JSON.stringify({ postId: postId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast("Removed post from bookmark ✅");

      setBookmarks(() => bookmarks.filter((item) => item.id !== postId));
    } catch (error) {
      toast.error("Encounter error while trying to remove the post");
    }
  };

  useEffect(() => {
    bookmarks.length === 0 && userId ? getBookmarks() : null;
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold opacity-65 mb-2">Bookmark Posts</h1>
      <p className="text-sm w-[50%]">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, quae iusto.
      </p>

      <section className="w-full flex flex-wrap items-center justify-start space-x-3 mt-10">
        {bookmarks?.map((item) => (
          <Fragment key={item.id}>
            <PostCard data={item} type="bookmark" removeFromBookmark={() => removePost(item.id)} />
          </Fragment>
        ))}
      </section>
    </>
  );
};

export default Bookmarks;