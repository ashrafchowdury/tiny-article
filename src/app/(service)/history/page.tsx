"use client";
import React, { Fragment, useState, useEffect } from "react";
import PostCard from "@/components/post-card";
import { POST_TYPE } from "@/utils/types";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { posts } from "@/temp/contants";

const Bookmarks = () => {
  const [history, setHistory] = useState<POST_TYPE[]>([]);
  const { userId } = useAuth();

  return (
    <>
      <h1 className="text-xl font-bold opacity-65 mb-2">History</h1>
      <p className="text-sm w-[50%]">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, quae iusto.
      </p>

      <section className="mt-10">
        <p className="text-xs font-medium opacity-70 mb-3">Now</p>
        <div className="w-full flex flex-wrap items-center justify-start space-x-3">
          {posts?.map((item) => (
            <Fragment key={item.id}>
              <PostCard data={item} />
            </Fragment>
          ))}
        </div>

        <p className="text-xs font-medium opacity-70 mt-12 mb-3">18 Hours ago</p>
        <div className="w-full flex flex-wrap items-center justify-start space-x-3">
          {posts.reverse().map((item) => (
            <Fragment key={item.id}>
              <PostCard data={item} />
            </Fragment>
          ))}
        </div>
      </section>
    </>
  );
};

export default Bookmarks;
