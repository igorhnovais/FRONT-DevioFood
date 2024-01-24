'use client';

import React from 'react';

import { ResumeOrder } from '../protocols/protocols';

interface ResumeOrderProps {
  item: ResumeOrder;
}

export default function ResumeOrder({ item }: ResumeOrderProps) {
  return (
    <main className="">
      <div className="p-4 flex justify-between">
        <h3 className="text-sm">
          {item.quantity}x {item.description}
        </h3>
        <h3 className="text-sm">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(Number(item.total) / 100)}
        </h3>
      </div>
    </main>
  );
}
