"use client";
import React from "react";
import Link from "next/link";
import { ChevronsDownUp } from "lucide-react";
import Image from "next/image";
import paths from "@/utils/paths";
import { useUser } from "@clerk/nextjs";
import SidebarUserProfileCardSkeleton from "./skeletons/sidebar-user-profile-card-skeleton";
import { Dialog, DialogContent, DialogTrigger } from "./ui";
import { UserProfile } from "@clerk/nextjs";

const Sidebar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

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

      {isLoaded && isSignedIn ? (
        <Dialog>
          <DialogTrigger>
            <section className="p-2 rounded-md border flex items-center justify-between mx-6 cursor-pointer hover:bg-secondary duration-300">
              <div className="flex items-center space-x-2">
                {user.hasImage ? (
                  <img
                    src={user.imageUrl}
                    alt={user.username as string}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                ) : (
                  <div className="w-10 h-10 bg-secondary rounded-md flex items-center justify-center uppercase">
                    {user?.username?.slice(0, 2)}
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold text-start">{user?.username}</p>
                  <p className="w-[80%] text-sm opacity-75 truncate">{user?.emailAddresses[0].emailAddress}</p>
                </div>
              </div>

              <ChevronsDownUp className="w-4 h-4" />
            </section>
          </DialogTrigger>
          <DialogContent className="!p-0 !w-auto !max-w-full scale-105">
            <UserProfile routing="hash" />
          </DialogContent>
        </Dialog>
      ) : (
        <SidebarUserProfileCardSkeleton />
      )}
    </aside>
  );
};

export default Sidebar;
