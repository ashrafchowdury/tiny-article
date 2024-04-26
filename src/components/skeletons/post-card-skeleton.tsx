import { Fragment } from "react";
import { Skeleton } from "../ui";

const PostCardSkeleton = () => {
  return (
    <div className="w-[320px] h-[220px] border rounded-md overflow-hidden">
      <div className="w-fyll h-[38px] border-b overflow-hidden px-3 flex items-center justify-between">
        <Skeleton className="w-[70px] h-[20px]" />

        <div className="flex items-center space-x-2">
          {Array.from({ length: 3 }).map((_, ind) => (
            <Fragment key={ind}>
              <Skeleton className="w-6 h-6" />
            </Fragment>
          ))}
        </div>
      </div>

      <div className="p-3 w-full space-y-4">
        <Skeleton className="w-[40%] h-3" />
        <Skeleton className="w-[90%] h-3" />
        <Skeleton className="w-[90%] h-3" />
        <Skeleton className="w-[80%] h-3" />
        <Skeleton className="w-[20%] h-3" />
        <Skeleton></Skeleton>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
