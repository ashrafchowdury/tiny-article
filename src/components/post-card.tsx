import React from "react";
import {  Clipboard, EllipsisVertical, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";

const PostCard = () => {
  return (
    <div className="w-[320px] h-[220px] border rounded-md overflow-hidden">
      <div className="w-fyll h-[38px] border-b overflow-hidden px-3 flex items-center justify-between">
        <p className="text-sm">Any Post</p>

        <div className="flex items-center space-x-2">
          <button className="w-6 h-6 flex items-center justify-center bg-primary text-white rounded-sm">
            <Clipboard className="w-[14px] h-[14px]" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center border rounded-sm">
            <Edit className="w-[14px] h-[14px]" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-6 h-6 flex items-center justify-center border rounded-sm">
                <EllipsisVertical className="w-[14px] h-[14px]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="end">
              <DropdownMenuLabel className="!text-xs py-1 opacity-70">About Post</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>Bookmark Post</DropdownMenuItem>
              <DropdownMenuItem>Report Bug</DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete Post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="py-2 px-3 w-full">
        <pre className="text-sm text-wrap">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eum voluptatum dolorem laborum velit
          amet aliquam, assumenda deleniti necessitatibus. 😗
          <br /> <br />
          Esse beatae voluptatem totam exercitationem architecto debitis natus! Ea, facere dolores. ✅
        </pre>
      </div>
    </div>
  );
};

export default PostCard;
