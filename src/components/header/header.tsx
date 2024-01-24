'use client';

import Link from 'next/link';
import React from 'react';

import { PiHamburger } from 'react-icons/pi';

export default function Header() {
  return (
    <main className="flex justify-between items-center p-1 bg-green-700 text-white ml-16 mr-16">
      <div className="flex items-center">
        <PiHamburger className="font-bold mr-2" />
        <h2 className="font-bold"> Fastfood</h2>
      </div>
      <div className="">
        <button type="button" className="ml-1 text-xs font-bold">
          <Link href="/">Pedidos</Link>
        </button>
        <button type="button" className="ml-3 text-xs font-bold">
          <Link href="/kitchen">Cozinha</Link>
        </button>
        <button type="button" className="ml-3 text-xs font-bold">
          <Link href="/withdrawal">Retirada</Link>
        </button>
      </div>
    </main>
  );
}
