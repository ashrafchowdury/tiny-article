import Navbar from "@/components/nav";
import Image from "next/image";

export default function Home() {
  return (
    <main className="xl:w-[1150px] lg:w-[1025px] md:w-[750px] sm:w-[550px] w-[95%] mx-auto">
      <Navbar />

      <header className="flex flex-col items-center">
        <h1 className="text-5xl font-bold text-center w-[75%] mt-20 mb-7">
          Lorem ipsum, dolor sit amet consec tetur adipisicing elit.
        </h1>
        <img
          src="https://cdn.dribbble.com/userupload/11228894/file/original-7516fafc01446873bd02460a0da92b78.png?resize=1024x768"
          alt="Hero image"
          className="w-full h-[650px] border rounded-md object-cover"
        />
      </header>
    </main>
  );
}
