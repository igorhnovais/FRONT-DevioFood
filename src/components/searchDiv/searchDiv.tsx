'use client';

import React from 'react';
import Image from 'next/image';

import { Product } from '../protocols/protocols';

interface ProductImageProps {
  item: Product;
}

export default function SearchDiv({ item }: ProductImageProps) {
  return (
    <main>
      <div>
        <Image src={item.image} alt="logo" width={230} height={120} />
        <h4>{item.name}</h4>
        <p>hamburguer gostoso</p>
        <h2>{item.price}</h2>
      </div>
    </main>
  );
}
