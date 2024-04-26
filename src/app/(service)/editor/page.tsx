"use client";
import { Fragment, useState } from "react";
import { SendHorizontal, Eraser } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, Button } from "@/components/ui";
import PostCard from "@/components/post-card";
import PostCardSkeleton from "@/components/skeletons/post-card-skeleton";

import { toast } from "sonner";

const Editor = () => {
  const [url, setUrl] = useState("");
  const [article, setArticle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const onSubmitUrl = async () => {
    try {
      if (!url) return;
      setIsLoading(true);
    } catch (error) {
      toast.error("Encounter error. Please try again later");
    }
  };

  const onSubmitArticle = async () => {
    try {
      if (!article) return;
      setIsLoading(true);
    } catch (error) {
      toast.error("Encounter error. Please try again later");
    }
  };
  
  return (
    <>
      <h1 className="text-2xl font-bold opacity-65 mb-2">Generate Posts</h1>
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
            className="w-full border py-2 px-3 rounded-md"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Button
            size="icon"
            className="w-8 h-8 bg-primary absolute top-[5px] right-[7px]"
            disabled={isLoading || Boolean(article)}
          >
            <SendHorizontal className="w-4 h-4" />
          </Button>
        </div>

        <label htmlFor="" className="text-sm font-medium opacity-70">
          Past Article Here
        </label>

        <div className="w-full mt-2 relative">
          <textarea
            className="w-full h-[300px] border pt-3 pb-14 px-3 rounded-md"
            placeholder="Past your article here..."
            onChange={(e) => setArticle(e.target.value)}
            value={article}
 
          ></textarea>

          <div className="w-full h-[55px] border-t z-20 absolute bottom-1.5 left-0.5 right-0.5 flex items-center justify-end px-3 space-x-2">
            <Button
              className="py-1 text-sm"
              variant="outline"
              disabled={isLoading || Boolean(url) || !Boolean(article)}
              onClick={() => setArticle("")}
            >
              Clear
              <Eraser className="w-3 h-3 ml-2" />
            </Button>
            <Button className="!py-1 bg-primary text-sm font-semibold" disabled={isLoading || Boolean(url)}>
              Generate
              <SendHorizontal className="w-3 h-3 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold opacity-65 mb-5">Posts</h2>

          <div className="w-full flex items-center justify-center">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-[1380px] flex items-center justify-center"
            >
              <CarouselContent>
                {Array.from({ length: 7 }).map((item, ind) => (
                  <CarouselItem key={ind} className="md:basis-1/2 lg:basis-1/4">
                    <PostCard />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      )}

      {isLoading && (
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
