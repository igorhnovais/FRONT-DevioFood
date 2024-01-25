'use client';

import axios from 'axios';
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import Aditional from '../aditional/aditional';
import { Product, aditionals } from '../protocols/protocols';

interface ProductImageProps {
  item: Product;
  setLoading: (value: []) => void;
}

export default function ProductImage({ item, setLoading }: ProductImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState(1);
  const [textArea, setTextArea] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  function makeOrder() {
    let name = window.localStorage.getItem('name');
    const bacon = window.localStorage.getItem('bacon');
    const baconPrice = Number(window.localStorage.getItem('100')) || 0;
    const cheddar = window.localStorage.getItem('cheddar');
    const cheddarPrice = Number(window.localStorage.getItem('200')) || 0;
    const molho = window.localStorage.getItem('molho');
    const molhoPrice = Number(window.localStorage.getItem('150')) || 0;

    while (!name) {
      name = prompt('Qual é o seu nome?');
      if (name) {
        window.localStorage.setItem('name', name);
      }
    }

    const obj = {
      productId: item.id,
      nameCustumer: name,
      observation: textArea,
      transshipment: 0,
      total: item.price + baconPrice + cheddarPrice + molhoPrice,
      drop: false,
      description: item.name,
      aditional: `adicional ${bacon}, ${cheddar}, ${molho}`,
      quantity: Number(select),
    };

    const promise = axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/orders`,
      obj,
    );
    promise.then(() => {
      setLoading([]);
      window.localStorage.removeItem('bacon');
      window.localStorage.removeItem('cheddar');
      window.localStorage.removeItem('molho');
      window.location.reload();
    });
    promise.catch(err => {
      console.log(err.response.data.message);
    });
  }

  return (
    <>
      <button className="p-9" type="button" onClick={() => openModal()}>
        <Image
          src={item.image}
          alt="logo"
          width={230}
          height={120}
          className="shadow-xl border rounded-lg"
        />
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
                    onChange={e => setSelect(Number(e.target.value))}
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
                    onChange={e => setTextArea(e.target.value)}
                  />
                </div>
              </div>
              <section className="border border-slate-400 p-10 mb-5">
                <div className="p-4 flex justify-between">
                  <h3 className="text-sm">
                    {select}x {item.name}
                  </h3>
                  <h3 className="text-sm">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format((item.price * select) / 100)}
                  </h3>
                </div>
                <div className="p-4 border-t-2 border-dashed text-sm">
                  <h2>Total do pedido:</h2>
                  <h1 className="text-xl font-bold">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(item.price / 100)}
                  </h1>
                </div>
              </section>
              <section className="flex justify-end">
                <button
                  type="button"
                  className="ml-9 w-56 h-8 rounded-xl border border-green-700 text-sm font-bold text-green-700"
                  onClick={() => makeOrder()}
                >
                  Continuar adicionando
                </button>
                <button
                  type="button"
                  className="ml-9 bg-green-700 text-white text-sm font-bold w-56 h-8 rounded-xl"
                  onClick={() => makeOrder()}
                >
                  Adicionar o pedido
                </button>
              </section>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
