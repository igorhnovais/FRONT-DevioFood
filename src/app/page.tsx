'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Swal from 'sweetalert2';
import { DebounceInput } from 'react-debounce-input';
import { IoMdCloseCircle } from 'react-icons/io';
import Link from 'next/link';

import Header from '@/components/header/header';
import ProductImage from '@/components/productImage/productImage';
import SearchDiv from '@/components/searchDiv/searchDiv';
import ResumeOrders from '@/components/resumeOrder/resumeOrder';
import { OrderFinish } from '@/components/protocols/protocols';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([] as OrderFinish[]);
  const [quest, setQuest] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const promise = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    promise.then(resp => setProducts(resp.data));
    promise.catch(err => {
      console.log(err.response.data.message);
    });

    const name = localStorage.getItem('name');

    if (name) {
      const promiseOrder = axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${name}`,
      );
      promiseOrder.then(resp => {
        setOrders(resp.data);
        console.log('orders', resp.data);
      });
      promiseOrder.catch(err => {
        console.log(err.response.data.message);
      });
    }
  }, [loading]);

  const HandleChange = (value: string) => {
    if (value.length >= 1) {
      const promise = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/${value}`);
      promise.then(resp => setQuest(resp.data));
    } else {
      setQuest([]);
    }
  };

  function category() {
    Swal.fire('Função disponível em breve!');
  }

  function closeSearch() {
    setQuest([]);
    setText('');
  }

  return (
    <>
      <Header />
      <main className="pl-36 pr-36 pt-10 pb-10">
        <section className="mb-5 styleInput">
          <h1 className="text-xl font-bold"> Seja bem vindo!</h1>
          <DebounceInput
            value={text}
            minLength={1}
            debounceTimeout={400}
            placeholder="O que você procura?"
            onChange={event => HandleChange(event.target.value)}
            style={{
              backgroundColor: '#f0f0f0',
              padding: '8px',
              borderRadius: '4px',
            }}
          />
          <div
            className="flex"
            style={{ display: quest.length === 0 ? 'none' : 'flex' }}
          >
            <div className="searchDiv">
              {quest.map(item => (
                <SearchDiv item={item} />
              ))}
            </div>
            <div className="closeDiv">
              <IoMdCloseCircle onClick={() => closeSearch()} />
            </div>
          </div>
        </section>
        <section className="mb-5">
          <h1 className="text-sm font-bold">Categorias</h1>
          <p className="text-xs mb-2">Navegue por categoria</p>
          <div className="flex styleImage">
            <div className="relative mr-2">
              <Image
                src="/assets/combo.png"
                alt="logo"
                width={200}
                height={80}
                onClick={() => category()}
                className="mb-2 shadow-xl border rounded-lg"
              />
              <h2 className="absolute top-10 left-0 right-0 text-center text-shadow">
                Combos
              </h2>
            </div>
            <div className="relative mr-2">
              <Image
                src="/assets/acompanhamento.png"
                alt="logo"
                width={200}
                height={80}
                onClick={() => category()}
                className="mb-2 shadow-xl border rounded-lg"
              />
              <h2 className="absolute top-10 left-0 right-0 text-center text-shadow">
                Acompanhamentos
              </h2>
            </div>
            <div className="relative mr-2">
              <Image
                src="/assets/refrigerante.png"
                alt="logo"
                width={200}
                height={80}
                onClick={() => category()}
                className="mb-2 shadow-xl border rounded-lg"
              />
              <h2 className="absolute top-10 left-0 right-0 text-center text-shadow">
                Refrigerante
              </h2>
            </div>
            <div className="relative">
              <Image
                src="/assets/sobremesa.png"
                alt="logo"
                width={200}
                height={80}
                onClick={() => category()}
                className="mb-2 shadow-xl border rounded-lg"
              />
              <h2 className="absolute top-10 left-0 right-0 text-center text-shadow">
                Sobremesa
              </h2>
            </div>
          </div>
        </section>
        <section className="mb-9">
          <h1 className="text-sm font-bold">Produtos</h1>
          <p className="text-xs mb-2">
            Selecione um produto para adicionar ao seu pedido
          </p>
          <div className="flex">
            {products.map(item => (
              <ProductImage item={item} setLoading={setLoading} />
            ))}
          </div>
        </section>
        {orders.length > 0 ? (
          <section className="border border-slate-400 p-10 mb-5">
            {orders[0]?.infos.map(item => <ResumeOrders item={item} />)}
            <div className="p-4 border-t-2 border-dashed text-sm">
              <h2>Total do pedido:</h2>
              <h1 className="text-xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(orders[0].balance / 100)}
              </h1>
            </div>
          </section>
        ) : (
          <p>.</p>
        )}
        <section className="flex justify-end">
          <button
            type="button"
            className="ml-9 w-56 h-8 rounded-xl border border-slate-400 text-slate-400"
            onClick={() => category()}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="ml-9 bg-slate-400 text-white w-56 h-8 rounded-xl"
          >
            <Link href="/finish">Finalizar pedido</Link>
          </button>
        </section>
      </main>
    </>
  );
}
