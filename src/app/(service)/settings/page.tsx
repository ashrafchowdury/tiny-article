"use client";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SwitchElement,
  Button,
} from "@/components/ui";
import { voices, utility } from "@/utils/constant";
import { useAuth } from "@clerk/nextjs";
import { VOICE_TYPE } from "@/utils/types";
import {
  useUpdateCustomPrompt,
  useFetchCustomPrompt,
} from "@/libs/queries/useCustomPrompt";

const Settings = () => {
  const { userId } = useAuth();
  const updatePrompt = useUpdateCustomPrompt({ userId });
  const fetcher = useFetchCustomPrompt({ userId });

  const [customPrompt, setCustomPrompt] = useState("");
  const [selectTone, setSelectTone] = useState<VOICE_TYPE>("netural");
  const [utilities, setUtilities] = useState({
    isFormatPost: true,
    isEmoji: false,
    isHashtag: false,
    isAutoSavePost: true,
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
    const data = {
      voice: "netural" as VOICE_TYPE,
      isFormatPost: true,
      isEmoji: false,
      isHashtag: false,
      isAutoSavePost: true,
    };
    updatePrompt.mutate(data);
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
      <p className="text-sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur,
        quae iusto.
      </p>

      <section className="w-full flex items-start justify-between space-x-6 mt-10">
        <div className="w-full space-y-4">
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

          <div className="w-full flex items-center space-x-3 !mt-40">
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

        <div className="w-[450px]">
          <div className="w-full space-y-2">
            <label htmlFor="" className="text-sm font-medium opacity-70">
              Utility options
            </label>
            <div className="space-y-4">
              {utility.map((item) => (
                <SwitchElement
                  title={item.title}
                  id={item.key}
                  checked={utilities[item.key as UtilityKeys]}
                  onClick={() => onUtilityChange(item.key as UtilityKeys)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;
