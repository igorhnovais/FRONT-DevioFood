'use client';

import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import { MdRadioButtonUnchecked } from 'react-icons/md';

import { Aditional } from '../protocols/protocols';

interface AditionalProps {
  item: Aditional;
}

export default function Aditional({ item }: AditionalProps) {
  const [color, setColor] = useState('');
  const food = item.name;
  const price = item.price.toString();

  const checkButton = () => {
    if (color === '') {
      setColor('bg-lime-600 rounded-lg');
      window.localStorage.setItem(`${food}`, food);
      window.localStorage.setItem(`${price}`, price);
    } else {
      setColor('');
      window.localStorage.removeItem(`${food}`);
      window.localStorage.removeItem(`${price}`);
    }
  };

  return (
    <main className="flex justify-between mb-7">
      <div className="flex">
        <Image
          src={item.image}
          alt="logo"
          width={60}
          height={40}
          className="shadow-xl border mr-5"
        />
        <div>
          <h6 className="text-sm font-bold">{item.name}</h6>
          <p className="text-xs mb-6">{item.g}g</p>
        </div>
      </div>
      <div className="flex justify-around items-center">
        <h6 className="text-sm text-slate-500 font-bold">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(item.price / 100)}
        </h6>
        <MdRadioButtonUnchecked
          onClick={() => checkButton()}
          className={`${color} ml-4`}
        />
      </div>
    </main>
  );
}
