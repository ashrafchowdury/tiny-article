"use client";
import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SwitchElement, Button } from "@/components/ui";
import { tones, utility } from "@/utils/constant";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

const Settings = () => {
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectTone, setSelectTone] = useState("");
  const [utilities, setUtilities] = useState({
    format: true,
    emoji: false,
    hashtag: false,
    save: true,
  });

  const { userId } = useAuth();

  type UtilityKeys = keyof typeof utilities;
  const onUtilityChange = (title: UtilityKeys) => {
    setUtilities({ ...utilities, [title]: !utilities[title] });
  };

  const handleSaveSettings = async () => {
    try {
      await fetch(`api/${userId}/custom-prompt`, {
        method: "POST",
        body: JSON.stringify({ prompt: customPrompt, voice: selectTone, utilities }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast("Updated propmt settings successfully.");
    } catch (error) {
      toast.error("Failed to save settings, please try again later");
    }
  };

  const handleResetSettings = async () => {
    try {
      await fetch(`api/${userId}/custom-prompt`, {
        method: "POST",
        body: JSON.stringify({
          prompt: "",
          voice: "netural",
          isFormatPost: true,
          isEmoji: false,
          isHashtag: false,
          isAutoSavePost: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast("Updated propmt settings successfully.");

      setCustomPrompt("");
      setSelectTone("netural");
      setUtilities({
        format: true,
        emoji: false,
        hashtag: false,
        save: true,
      });
    } catch (error) {
      toast.error("Failed to save settings, please try again later");
    }
  };

  const getPromptSettings = async () => {
    try {
      const data = await fetch(`api/${userId}/custom-prompt`);
      const result = await data.json();

      if (result.data) {
        const { data: res } = result;
        setCustomPrompt(res.prompt);
        setSelectTone(res.voice);
        setUtilities({
          format: res.isFormatPost,
          emoji: res.isEmoji,
          hashtag: res.isHashtag,
          save: res.isAutoSavePost,
        });
      }
    } catch (error) {
      toast.error("Failed to load prompt settings");
    }
  };

  useEffect(() => {
    userId ? getPromptSettings() : null;
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold opacity-65 mb-2">Settings</h1>
      <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, quae iusto.</p>

      <section className="w-full flex items-start justify-between space-x-6 mt-10">
        <div className="w-full space-y-4">
          <div className="w-full space-y-1.5">
            <label htmlFor="" className="text-sm font-medium opacity-70">
              Add Custom Prompt
            </label>

            <textarea
              className="w-full h-[200px] border p-4 rounded-md text-sm"
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
              <Select onValueChange={(e) => setSelectTone(e)} value={selectTone}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select voice tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((item) => (
                    <SelectItem value={item} key={item} className="capitalize">
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-full flex items-center space-x-3 !mt-40">
            <Button className="w-full opacity-80" variant="destructive" onClick={handleResetSettings}>
              Reset Settings
            </Button>
            <Button className="w-full" onClick={handleSaveSettings}>
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
                  id={item.id}
                  checked={utilities[item.id as UtilityKeys]}
                  onClick={() => onUtilityChange(item.id as UtilityKeys)}
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
