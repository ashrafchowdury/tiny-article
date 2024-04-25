import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <nav className='w-full h-[80px] flex items-center justify-between'>
      <p>Logo</p>

      <div className='flex items-center space-x-5 *:text-sm'>
        <Link href="/">Home</Link>
        <Link href="/">Service</Link>
        <Link href="/">About</Link>
      </div>

      <Link href="/sign-in">
        <button className='text-sm'>Get Started</button>
      </Link>
    </nav>
  );
}

export default Navbar