'use client';

import React from 'react';
import Image from 'next/image';

import { Product } from '../protocols/protocols';

interface ProductImageProps {
  item: Product;
}

export default function ProductImage({ item }: ProductImageProps) {
  return (
    <main className="p-9">
      <Image src={item.image} alt="logo" width={230} height={120} />
      <h4>{item.name}</h4>
      <p>hamburguer gostoso</p>
      <h2>{item.price}</h2>
    </main>
  );
}
