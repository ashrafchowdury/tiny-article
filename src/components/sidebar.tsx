import React from "react";
import Link from "next/link";
import {ChevronsDownUp } from "lucide-react";
import Image from "next/image";
import paths from "@/utils/paths";

const Sidebar = () => {

  return (
    <aside className="w-[380px] h-screen border pt-10 pb-5 flex flex-col justify-between">
      <section>
        <div className="mx-6 space-x-3 flex items-center">
          <Image src="" alt="" width={25} height={25} className="border rounded-sm" />{" "}
          <p className="text-2xl font-bold opacity-60">Post Maker</p>
        </div>

        <p className="text-sm font-medium opacity-70 mt-24 mb-3 mx-6">Dashboard</p>
        <section className="w-full">
          {paths.map((item) => (
            <Link href={item.url}>
              <button className="flex items-center py-3 px-6 w-full hover:bg-secondary duration-200 text-[16px] font-medium my-1">
                <item.icon className="w-5 h-5 mr-2" /> {item.title}
              </button>
            </Link>
          ))}
        </section>
      </section>

      <section className="p-2 rounded-md border flex items-center justify-between mx-6">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-secondary rounded-md flex items-center justify-center">AR</div>

          <div>
            <p className="text-sm font-semibold">Ashraf</p>
            <p className="text-sm opacity-75">ashraf@gmail.com</p>
          </div>
        </div>

        <ChevronsDownUp className="w-4 h-4" />
      </section>
    </aside>
  );
};

export default Sidebar;
