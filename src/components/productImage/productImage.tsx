'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';

import { Product, aditionals } from '../protocols/protocols';
import Aditional from '../aditional/aditional';

interface ProductImageProps {
  item: Product;
}

export default function ProductImage({ item }: ProductImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button className="p-9" type="button" onClick={() => openModal()}>
        <Image src={item.image} alt="logo" width={230} height={120} />
        <h4>{item.name}</h4>
        <p>hamburguer gostoso</p>
        <h2>{item.price}</h2>
      </button>
      <div>
        {isOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="flex justify-between">
                <h1 className="text-xl font-bold mb-6">Revise seu pedido!</h1>
                <IoMdClose
                  onClick={closeModal}
                  className="text-slate-400 text-xl font-bold"
                />
              </div>
              <div className="flex justify-between mb-8">
                <Image
                  src={item.image}
                  alt="logo"
                  width={120}
                  height={100}
                  className="shadow-xl border rounded-lg"
                />
                <div className="mr-24">
                  <h6 className=" text-sm font-bold">{item.name}</h6>
                  <p className="text-xs mb-6">um hamburguer muito gostoso</p>
                  <select
                    id="quantidade"
                    name="quantidade"
                    className="border border-lime-600 text-lime-600"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <h3 className="text-xs font-bold">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(item.price / 100)}
                </h3>
              </div>
              <div>
                <h6 className="text-sm font-bold">Adicionais</h6>
                <p className="text-xs mb-6">
                  Selecione os ingredientes que você quer adicionar a mais no
                  seu lanche.
                </p>
                <div className="mb-7">
                  {aditionals.map(r => (
                    <Aditional item={r} />
                  ))}
                </div>
                <div>
                  <h6 className="text-sm font-bold">Observações</h6>
                  <textarea
                    placeholder="adicione uma observação ao pedido"
                    className="w-full bg-gray-200 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
