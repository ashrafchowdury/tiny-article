import React from 'react'
import Link from 'next/link'
import { Button } from './ui';
const Navbar = () => {
  return (
    <nav className="w-full h-[80px] flex items-center justify-between">
      <p className="text-lg font-semibold">Project-X</p>

      <div className="flex items-center space-x-5">
        <Link href="/">Home</Link>
        <Link href="/">Service</Link>
        <Link href="/">About</Link>
      </div>

      <Link href="/editor">
        <Button className="font-medium px-5 py-1.5 rounded-md">Get Started</Button>
      </Link>
    </nav>
  );
}

export default Navbar