import { useState } from "react";
import { EllipsisVertical, Edit, Bookmark } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui";
import { POST_TYPE } from "@/utils/types";
import CopyButton from "./copy-button";
import { cn } from "@/libs/utils";

const PostCard = ({
  data,
  type = "main",
  addToBookmark,
  removeFromBookmark,
  className,
}: {
  data: POST_TYPE;
  type?: "bookmark" | "main";
  addToBookmark?: any;
  removeFromBookmark?: any;
  className?: string;
}) => {
  const [content, setContent] = useState(
    `${data.title}

${data.content.flatMap((item) => `${item.replaceAll("**", "").replaceAll("*", "-")}\n \n`)}` ??
      ""
  );

  return (
    <div
      className={cn(
        "md:w-[280px] lg:w-[300px] xl:w-[340px] md:h-[190px] lg:h-[200px] xl:h-[225px] border rounded-md overflow-hidden my-1 md:m-1 lg:m-1.5 xl:m-2",
        className
      )}
    >
      <div className="w-fyll h-[38px] border-b overflow-hidden px-3 flex items-center justify-between">
        <p className="text-sm truncate text-nowrap mr-5">{data.title}</p>

        <div className="flex items-center space-x-2">
          <CopyButton content={content} />

          <Dialog>
            <DialogTrigger>
              <button className="w-6 h-6 flex items-center justify-center border rounded-sm">
                <Edit className="w-[14px] h-[14px]" />
              </button>
            </DialogTrigger>
            <DialogContent className="!p-0 overflow-hidden">
              <section className="w-full h-[300px] relative">
                <nav className="h-[48px] border flex items-center justify-between px-4">
                  <p className="text-sm">Editor</p>
                  <div className="flex items-center space-x-3 mr-7">
                    <CopyButton
                      content={content}
                      className="text-black bg-transparent border"
                    />

                    {type == "main" && (
                      <button
                        className="w-6 h-6 flex items-center justify-center bg-transparent border rounded-sm"
                        onClick={addToBookmark}
                      >
                        <Bookmark className="w-[14px] h-[14px]" />
                      </button>
                    )}
                  </div>
                </nav>
                <div>
                  <textarea
                    className="w-full h-[252px] border p-4 outline-none bg-transparent"
                    placeholder="Edit the post"
                    defaultValue={""}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
                <p className="text-sm absolute bottom-3 left-5 z-50">
                  {content.length}
                </p>
              </section>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-6 h-6 flex items-center justify-center border rounded-sm">
                <EllipsisVertical className="w-[14px] h-[14px]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="end">
              <DropdownMenuLabel className="!text-xs py-1 opacity-70">
                About Post
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {type === "main" ? (
                <DropdownMenuItem onClick={addToBookmark}>
                  Bookmark Post
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={removeFromBookmark}>
                  Remove Post
                </DropdownMenuItem>
              )}

              <DropdownMenuItem>Report Bug</DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete Post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="py-2 px-3 w-full">
        <pre className="text-sm text-wrap">
          {data.content.flatMap((item) => (
            <span className="block mb-2">
              {item.replaceAll("**", "").replaceAll("*", "-")}
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default PostCard;
