import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui";

export default function Home() {
  return (
    <main className="xl:w-[1150px] lg:w-[1025px] md:w-[750px] sm:w-[550px] w-[95%] mx-auto">
      <nav className="w-full h-[70px] sm:h-[80px] flex items-center justify-between">
        <p className="text-xl font-semibold">tiny'article</p>

        <div className="items-center space-x-5 hidden sm:flex *:text-sm">
          <Link href="/">Home</Link>
          <Link href="/">Service</Link>
          <Link href="/">About</Link>
        </div>

        <Link href="/editor">
          <Button className="font-medium px-5 py-1.5 rounded-md text-xs sm:text-sm">
            Get Started
          </Button>
        </Link>
      </nav>

      <header className="flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center w-[95%] sm:w-[80%] md:w-[75%] mt-20 mb-7">
          Transform any article into engaging social media posts effortlessly!
        </h1>
        <img
          src="https://cdn.dribbble.com/userupload/11228894/file/original-7516fafc01446873bd02460a0da92b78.png?resize=1024x768"
          alt="Hero image"
          className="w-full h-[250px] sm:h-[380px] md:h-[450px] lg:h-[550px] xl:h-[650px] border rounded-md object-cover"
        />
      </header>

      <p className="mt-10 mb-3 opacity-70 text-sm underline text-center">
        Work is to be continued
      </p>
    </main>
  );
}
