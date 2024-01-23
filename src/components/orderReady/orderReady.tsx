'use client';

import React from 'react';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';
import Swal from 'sweetalert2';

import { OrderProgress } from '../protocols/protocols';

interface ProductOrderProps {
  item: OrderProgress;
}

function close() {
  Swal.fire('Função disponível em breve!');
}

export default function OrderReady({ item }: ProductOrderProps) {
  return (
    <main className="flex justify-around items-center border border-green-500 shadow-md mb-3 w-80 rounded-md">
      <div className="m-3 shadow-lg rounded-md">
        <Image
          src={item?.infos[0]?.product?.image}
          alt="logo"
          width={60}
          height={60}
        />
      </div>
      <div className="">
        <h6 className="text-sm font-bold">
          {item.id} - {item.nameCustomer}
        </h6>
        <p className="text-xs text-slate-500">
          {item?.infos[0]?.quantity}x {item?.infos[0]?.product?.name}
        </p>
      </div>
      <div>
        <div className="bg-red-200 text-red-700 mb-2 rounded-sm w-5 h-5 flex justify-center items-center">
          <IoMdClose onClick={() => close()} />
        </div>
      </div>
    </main>
  );
}
