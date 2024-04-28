import React from "react";
import { Skeleton } from "../ui";

const SidebarUserProfileCardSkeleton = () => {
  return (
    <div className="p-2 rounded-md border flex items-center justify-start space-x-2 mx-6">
      <Skeleton className="w-10 h-10" />

      <div className="w-[70%] space-y-2">
        <Skeleton className="w-[45%] h-4 rounded-sm" />
        <Skeleton className="w-[90%] h-3 rounded-sm" />
      </div>
    </div>
  );
};

export default SidebarUserProfileCardSkeleton;
