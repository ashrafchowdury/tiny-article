import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/libs/utils";

const outfit = Outfit({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Genrate social media ready posts from any article with a few clicks",
  description:
    "Transform any article into engaging social media posts ready to captivate your audience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInForceRedirectUrl="/editor"
      signUpForceRedirectUrl="/editor"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <html lang="en">
        <body className={cn(outfit.className, "bg-backgournd")}>
          {children} <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
