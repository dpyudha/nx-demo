'use client'
import React from 'react';
import AtomButton from '../atoms/AtomButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Component representing the navigation bar.
 * Renders navigation links and a button for the demo page.
 */
const MoleculesNavbar = () => {
  // Get the current pathname using next/navigation hook
  const pathname = usePathname();

  return (
    <header>
      <div className="mx-auto flex py-12 lg:px-24 md:px-16 sm:px-8 px-8 items-center justify-between lg:justify-start">
        <nav className="navigation lg:mr-auto hidden flex-col text-base justify-center z-50 fixed top-8 left-3 right-3 p-8 rounded-md shadow-md bg-white lg:flex lg:flex-row lg:relative lg:top-0 lg:shadow-none lg:bg-transparent lg:p-0 lg:items-center items-start">
          <Link className={`link ${pathname === '/' ? 'font-semibold' : 'font-light'} text-lg hover:font-semibold leading-6 mx-0 lg:mx-5 my-4 lg:my-0 relative`} href="/">
            Home
          </Link>
          <Link className={`link ${pathname === '/demo' ? 'font-semibold' : 'font-light'} text-lg hover:font-semibold leading-6 mx-0 lg:mx-5 my-4 lg:my-0 relative`} href="/demo">
            Demo
          </Link>
        </nav>
        <div className=" lg:inline-flex">
          <AtomButton to="/demo" color="primary">DEMO</AtomButton>
        </div>
      </div>
    </header>
  );
};

export default MoleculesNavbar;
