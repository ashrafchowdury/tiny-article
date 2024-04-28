"use client";
import React from "react";
import Link from "next/link";
import { EllipsisVertical, LogOut } from "lucide-react";
import Image from "next/image";
import paths from "@/utils/paths";
import { useUser } from "@clerk/nextjs";
import SidebarUserProfileCardSkeleton from "./skeletons/sidebar-user-profile-card-skeleton";
import { Dialog, DialogContent, DialogTrigger } from "./ui";
import { UserProfile, SignOutButton } from "@clerk/nextjs";
import { Skeleton } from "./ui";

const Sidebar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <aside className="w-[380px] h-screen border pt-10 pb-5 flex flex-col justify-between">
      <section>
        <div className="space-y-4">
          <div className="mx-6 space-x-2 flex items-center">
            <Image src="" alt="" width={28} height={28} className="border rounded-sm" />{" "}
            <p className="text-xl font-bold opacity-60">Post Maker</p>
          </div>
          <div className="w-[82%] border mx-auto"></div>
          {isLoaded && isSignedIn ? (
            <Dialog>
              <DialogTrigger>
                <div className="rounded-md flex items-center justify-between  mx-6 cursor-pointer">
                  <div className="w-full flex items-center space-x-2">
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

                  <EllipsisVertical className="w-4 h-4" />
                </div>
              </DialogTrigger>
              <DialogContent className="!p-0 !w-auto !max-w-full scale-105">
                <UserProfile routing="hash" />
              </DialogContent>
            </Dialog>
          ) : (
            <SidebarUserProfileCardSkeleton />
          )}
        </div>

        <p className="text-sm font-medium opacity-70 mt-24 mb-3 mx-6">Dashboard</p>
        <div className="w-full">
          {paths.map((item) => (
            <Link href={item.url} key={item.title}>
              <button className="flex items-center py-3 px-6 w-full hover:bg-secondary duration-200 text-[16px] font-medium my-1">
                <item.icon className="w-5 h-5 mr-3" /> {item.title}
              </button>
            </Link>
          ))}
        </div>
      </section>

      {isLoaded ? (
        <SignOutButton>
          <div className="flex items-center py-3 px-6 w-full hover:bg-secondary duration-200 text-[16px] font-medium cursor-pointer opacity-65 hover:opacity-100">
            <LogOut className="w-5 h-5 mr-3" /> Sign Out
          </div>
        </SignOutButton>
      ) : (
        <div className="flex items-center px-6">
          <Skeleton className="w-6 h-6 mr-2" /> <Skeleton className="w-24 h-5 rounded-sm" />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
