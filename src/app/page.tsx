import Navbar from "@/components/nav";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />

      <header className="flex flex-col items-center">
        <h1 className="text-5xl font-bold text-center w-[75%] mt-20 mb-6">
          Lorem ipsum, dolor sit amet consec tetur adipisicing elit.
        </h1>
        <Image src="" alt="" width={920} height={550} className="border rounded-md" />
      </header>
    </>
  );
}
