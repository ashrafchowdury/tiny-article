"use client";
import React, { useState, useEffect, Fragment } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SwitchElement,
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui";
import { voices, utility, MAX_USAGE_LIMIT } from "@/utils/constant";
import { useAuth } from "@clerk/nextjs";
import { VOICE_TYPE } from "@/utils/types";
import {
  useUpdateCustomPrompt,
  useFetchCustomPrompt,
} from "@/helpers/queries/useCustomPrompt";
import { cn } from "@/libs/utils";
import { useTotalUsage } from "@/helpers/queries/useLimit";
import { TriangleAlert } from "lucide-react";
import { defaultUserPromptSettings as defaultSettings } from "@/utils/constant";

const Settings = () => {
  const { userId } = useAuth();
  const updatePrompt = useUpdateCustomPrompt({ userId });
  const fetcher = useFetchCustomPrompt({ userId });
  const limit = useTotalUsage({ userId });

  const [customPrompt, setCustomPrompt] = useState("");
  const [selectTone, setSelectTone] = useState<VOICE_TYPE>("netural");
  const [utilities, setUtilities] = useState({
    isFormatPost: true,
    isEmoji: true,
    isHashtag: false,
    isAutoSavePost: false,
  });

  type UtilityKeys = keyof typeof utilities;
  const onUtilityChange = (title: UtilityKeys) => {
    setUtilities({ ...utilities, [title]: !utilities[title] });
  };

  const handleUpdatePrompt = () => {
    const data = {
      prompt: customPrompt,
      voice: selectTone,
      ...utilities,
    };
    updatePrompt.mutate(data);
  };

  const handleResetSettings = async () => {
    updatePrompt.mutate(defaultSettings);
  };

  useEffect(() => {
    if (fetcher.data) {
      setCustomPrompt(fetcher.data?.prompt as string);
      setSelectTone(fetcher.data?.voice);
      setUtilities({
        isFormatPost: fetcher.data?.isFormatPost,
        isEmoji: fetcher.data?.isEmoji,
        isHashtag: fetcher.data?.isHashtag,
        isAutoSavePost: fetcher.data?.isAutoSavePost,
      });
    }
  }, [updatePrompt.isSuccess, fetcher.isSuccess]);

  if (fetcher.isError) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center">
        <p className="text-lg text-center">
          Failed To Load Prompts. Please Try Again Later
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-xl font-bold opacity-65 mb-2">Settings</h1>
      <p className="text-sm w-full md:w-[70%] lg:w-[50%]">
        You can effortlessly tune the output to match your taste from here.
      </p>

      {limit.data?.reached && (
        <Alert className="mt-10" variant="destructive">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Reached Limit</AlertTitle>
          <AlertDescription>
            You have reached your daily limit. Wait 24 hours to reuse again.
          </AlertDescription>
        </Alert>
      )}

      <section className="w-full flex flex-col-reverse md:flex-row items-start justify-between md:space-x-6 mt-10">
        <div className="w-full space-y-4">
          {/* text prompt */}
          <div className="w-full space-y-1.5">
            <label htmlFor="" className="text-sm font-medium opacity-70">
              Add Custom Prompt
            </label>

            <textarea
              className="w-full h-[200px] p-4 rounded-md text-sm bg-input"
              placeholder="Write custom prompt..."
              maxLength={150}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
            />
          </div>

          {/* voice tone */}
          <div className="w-full space-y-5">
            <div className="w-full space-y-1.5">
              <label htmlFor="" className="text-sm font-medium opacity-70">
                Voice Tone
              </label>
              <Select
                onValueChange={(e: VOICE_TYPE) => setSelectTone(e)}
                value={selectTone}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select voice tone" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((item) => (
                    <SelectItem value={item} key={item} className="capitalize">
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* usage limit */}
          <div className="w-full !mt-8 space-y-1.5">
            <label htmlFor="" className="text-sm font-medium opacity-70">
              Usage Limit
            </label>

            <div className="w-full h-2.5 rounded-sm bg-input overflow-hidden">
              <div
                className="w-full h-2.5 bg-primary  rounded-sm flex items-center justify-end"
                style={{
                  transform: `translateX(-${100 - (limit.data?.usage * 20 || 0)}%)`,
                }}
              >
                <div className="w-4 h-3 rounded-sm bg-black/70 -mr-0.5"></div>
              </div>
            </div>

            <div className="w-full flex items-center justify-between opacity-70">
              {Array.from(
                { length: MAX_USAGE_LIMIT + 1 },
                (_, index) => index
              ).map((item) => (
                <span
                  key={item}
                  className={cn(
                    "text-xs",
                    item == limit.data?.usage && "font-bold text-sm"
                  )}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* buttons */}
          <div className="w-full flex items-center space-x-3 !mt-10 sm:!mt-20 md:!mt-40 !mb-10">
            <Button
              className="w-full opacity-80"
              variant="destructive"
              onClick={handleResetSettings}
            >
              Reset Settings
            </Button>
            <Button className="w-full" onClick={handleUpdatePrompt}>
              Update Settings
            </Button>
          </div>
        </div>

        {/* utility options */}
        <div className="w-full md:w-[450px] mb-6 md:mb-0">
          <div className="w-full space-y-2">
            <label htmlFor="" className="text-sm font-medium opacity-70">
              Utility options
            </label>
            <div className="space-y-4">
              {utility.map((item) => (
                <Fragment key={item.key}>
                  <SwitchElement
                    title={item.title}
                    id={item.key}
                    checked={utilities[item.key as UtilityKeys]}
                    onClick={() => onUtilityChange(item.key as UtilityKeys)}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;
