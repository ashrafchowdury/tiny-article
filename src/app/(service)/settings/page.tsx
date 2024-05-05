"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  CheckElement,
  SwitchElement,
  Button,
} from "@/components/ui";

const Settings = () => {
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectTone, setSelectTone] = useState("");

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
              className="w-full h-[250px] border p-4 rounded-md text-sm"
              placeholder="Write custom prompt..."
              maxLength={150}
            ></textarea>
          </div>

          <div className="w-full space-y-5">
            <div className="w-full space-y-1.5">
              <label htmlFor="" className="text-sm font-medium opacity-70">
                Voice Tone
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select voice tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full space-y-1.5">
              <label htmlFor="" className="text-sm font-medium opacity-70">
                Voice Tone
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select voice tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-full flex items-center space-x-3 !mt-40">
            <Button className="w-full opacity-80" variant="destructive">
              Reset Settings
            </Button>
            <Button className="w-full">
              Update Settings
            </Button>
          </div>
        </div>

        <div className="w-[450px]">
          <div className="w-full space-y-2">
            <label htmlFor="" className="text-sm font-medium opacity-70">
              Utility options
            </label>
            <div className="space-y-3">
              <CheckElement title="Format the posts" id="terms" />
              <CheckElement title="Use Emojies" id="terms" />
              <CheckElement title="Use Hashtags" id="terms" />
              <CheckElement title="Use Hashtags" id="terms" />
            </div>
          </div>

          <div className="w-full space-y-2 mt-5">
            <label htmlFor="" className="text-sm font-medium opacity-70">
              Utility options
            </label>
            <div className="space-y-3">
              <SwitchElement title="Format the posts" id="terms" />
              <SwitchElement title="Use Emojies" id="terms" />
              <SwitchElement title="Use Hashtags" id="terms" />
              <SwitchElement title="Use Hashtags" id="terms" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;
