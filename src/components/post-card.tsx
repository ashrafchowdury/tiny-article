import { useState } from "react";
import { Clipboard, EllipsisVertical, Edit, CheckCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { POST_TYPE } from "@/utils/types";

const PostCard = ({ data }: { data: POST_TYPE }) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopyPost = async () => {
    setIsCopied(true);

    navigator.clipboard.writeText(data.content);

    setTimeout(() => {
      setIsCopied(false);
    }, 2500);
  };

  return (
    <div className="w-[340px] h-[225px] border rounded-md overflow-hidden">
      <div className="w-fyll h-[38px] border-b overflow-hidden px-3 flex items-center justify-between">
        <p className="text-sm truncate text-nowrap mr-5">{data.title}</p>

        <div className="flex items-center space-x-2">
          <button
            className="w-6 h-6 flex items-center justify-center bg-primary text-white rounded-sm"
            onClick={onCopyPost}
          >
            {isCopied ? (
              <CheckCheck className="w-[14px] h-[14px] text-green-500" />
            ) : (
              <Clipboard className="w-[14px] h-[14px]" />
            )}
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
        <pre className="text-sm text-wrap">{data.content}</pre>
      </div>
    </div>
  );
};

export default PostCard;
