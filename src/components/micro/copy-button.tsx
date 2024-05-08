import React, { useState } from "react";
import { Clipboard, CheckCheck } from "lucide-react";
import { cn } from "@/libs/utils";


const CopyButton = ({ content, className }: { content: string; className?: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopyPost = async () => {
    setIsCopied(true);

    navigator.clipboard.writeText(content);

    setTimeout(() => {
      setIsCopied(false);
    }, 2500);
  };

  return (
    <button
      className={cn("w-6 h-6 flex items-center justify-center bg-primary rounded-sm", className)}
      onClick={onCopyPost}
    >
      {isCopied ? (
        <CheckCheck className="w-[14px] h-[14px] text-green-500" />
      ) : (
        <Clipboard className="w-[14px] h-[14px]" />
      )}
    </button>
  );
};

export default CopyButton;
