import React from "react";
import { SendHorizontal, Eraser } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui";
import PostCard from "@/components/post-card";
import PostCardSkeleton from "@/components/skeletons/post-card-skeleton";

const Editor = () => {
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
          <input type="text" placeholder="Add article URL here..." className="w-full border py-2 px-3 rounded-md" />

          <button className="w-8 h-8 rounded-sm bg-primary text-white flex items-center justify-center absolute top-[5px] right-[7px]">
            <SendHorizontal className="w-4 h-4" />
          </button>
        </div>

        <label htmlFor="" className="text-sm font-medium opacity-70">
          Past Article Here
        </label>

        <div className="w-full mt-2 relative">
          <textarea
            className="w-full h-[300px] border py-3 px-3 rounded-md"
            placeholder="Past your article here..."
          ></textarea>

          <div className="w-full h-[60px] border-t z-20 absolute bottom-1.5 left-0 right-0 flex items-center justify-end px-3 space-x-2">
            <button className="py-1.5 px-4 rounded-md border flex items-center text-sm">
              Clear
              <Eraser className="w-3 h-3 ml-2" />
            </button>
            <button className="py-1.5 px-4 rounded-md bg-primary flex items-center text-white text-sm font-semibold">
              Generate
              <SendHorizontal className="w-3 h-3 ml-2" />
            </button>
          </div>
        </div>
      </section>

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
    </>
  );
};

export default Editor;
