'use client';

import React from 'react';
import Image from 'next/image';

import { Product } from '../protocols/protocols';

interface ProductImageProps {
  item: Product;
}

export default function SearchDiv({ item }: ProductImageProps) {
  return (
    <main className="">
      <div className="shadow-xl border rounded-lg mr-3 p-3">
        <Image src={item.image} alt="logo" width={230} height={120} />
        <h4 className="text-sm font-bold">{item.name}</h4>
        <p className="text-xs">hamburguer gostoso</p>
        <h2 className="text-lg font-bold">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(item.price / 100)}
        </h2>
      </div>
    </main>
  );
}
