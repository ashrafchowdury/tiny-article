"use client";
import Sidebar from "@/components/sidebar";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/libs/query";
import { Sheet, SheetTrigger, SheetContent, Button } from "@/components/ui";
import { PanelRightClose } from "lucide-react";

export default function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex flex-col lg:flex-row items-start overflow-hidden">
        <nav className="w-full mb-5 px-5 sm:px-7 lg:px-10 h-[65px] flex items-center justify-between lg:hidden">
          <p>Project-X</p>{" "}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-7 h-7" size="icon" variant="outline">
                <PanelRightClose className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="p-0 m-0" side="left">
              <Sidebar className="w-full" />
            </SheetContent>
          </Sheet>
        </nav>

        <Sidebar className="hidden lg:flex" />

        <div className="w-full px-5 sm:px-7 lg:px-10 lg:pt-10 h-[90vh] lg:h-screen overflow-y-auto">
          {children}
        </div>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
