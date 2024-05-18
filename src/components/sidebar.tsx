"use client";
import React from "react";
import Link from "next/link";
import { EllipsisVertical, LogOut, XIcon } from "lucide-react";
import Image from "next/image";
import paths from "@/utils/paths";
import { useUser } from "@clerk/nextjs";
import SidebarUserProfileCardSkeleton from "./skeletons/sidebar-user-profile-card-skeleton";
import { Dialog, DialogContent, DialogTrigger, Button } from "./ui";
import { UserProfile, SignOutButton } from "@clerk/nextjs";
import { Skeleton } from "./ui";
import { cn } from "@/libs/utils";

const Sidebar = ({ className }: { className?: string }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <aside
      className={cn(
        "lg:w-[350px] xl:w-[380px] h-screen border-r pt-10 pb-3 md:pb-5 flex flex-col justify-between",
        className
      )}
    >
      <section>
        <div className="space-y-2 md:space-y-4">
          <div className="mx-3 md:mx-6 space-x-2 flex items-center">
            <Image
              src=""
              alt=""
              width={28}
              height={28}
              className="border rounded-sm w-5 h-5 md:w-7 md:h-7"
            />{" "}
            <p className="text-lg md:text-xl font-bold opacity-60">Project-X</p>
          </div>
          <div className="w-[90%] md:w-[83%] border border-border mx-auto"></div>
          {isLoaded && isSignedIn ? (
            <Dialog>
              <DialogTrigger className="w-full ">
                <div className="rounded-md flex items-center justify-between mx-3 md:mx-6 cursor-pointer">
                  <div className="w-full flex items-center space-x-2">
                    {user.hasImage ? (
                      <img
                        src={user.imageUrl}
                        alt={user.username as string}
                        className="w-8 md:w-10 h-8 md:h-10 rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-secondary rounded-md flex items-center justify-center uppercase">
                        {user?.username?.slice(0, 2)}
                      </div>
                    )}

                    <div>
                      <p className="text-sm font-semibold text-start">
                        {user?.username}
                      </p>
                      <p className="w-[80%] text-sm opacity-75 truncate">
                        {user?.emailAddresses[0].emailAddress}
                      </p>
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

        <p className="text-xs font-medium opacity-70 mt-24 mb-3 mx-3 md:mx-6">
          Service
        </p>
        <div className="w-full">
          {paths.service.map((item) => (
            <Link href={item.url} key={item.title}>
              <button className="flex items-center py-3 px-3 md:px-6 w-full hover:bg-input duration-200 text-sm font-medium my-1">
                <item.icon className="w-4 h-4 mr-3" /> {item.title}
              </button>
            </Link>
          ))}
        </div>

        <p className="text-xs font-medium opacity-70 mt-5 mb-3 mx-3 md:mx-6">
          About
        </p>
        <div className="w-full">
          {paths.resource.map((item) => (
            <Link href={item.url} key={item.title}>
              <button className="flex items-center py-3 px-3 md:px-6 w-full hover:bg-input duration-200 text-sm font-medium my-1">
                <item.icon className="w-4 h-4 mr-3" /> {item.title}
              </button>
            </Link>
          ))}
        </div>
      </section>

      {isLoaded ? (
        <SignOutButton redirectUrl="/">
          <div className="text-sm flex items-center py-3 px-3 md:px-6 w-full hover:bg-input duration-200 text-[16px] font-medium cursor-pointer opacity-65 hover:opacity-100">
            <LogOut className="w-4 h-4 mr-3" /> Sign Out
          </div>
        </SignOutButton>
      ) : (
        <div className="flex items-center px-3 md:px-6">
          <Skeleton className="w-6 h-6 mr-2" />{" "}
          <Skeleton className="w-24 h-5 rounded-sm" />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
