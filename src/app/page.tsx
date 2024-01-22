'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Swal from 'sweetalert2';
import { DebounceInput } from 'react-debounce-input';
import { IoMdCloseCircle } from 'react-icons/io';

import Header from '@/components/header/header';
import ProductImage from '@/components/productImage/productImage';
import SearchDiv from '@/components/searchDiv/searchDiv';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [quest, setQuest] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const promise = axios.get('http://localhost:5000/products');
    // const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
    promise.then(resp => setProducts(resp.data));
    promise.catch(err => {
      console.log(err.response.data.message);
    });
  }, []);

  const HandleChange = (value: string) => {
    if (value.length >= 1) {
      const promise = axios.post('http://localhost:5000/products/filter', {
        search: value,
      });
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
            <Image
              src="/assets/combo.png"
              alt="logo"
              width={230}
              height={100}
              onClick={() => category()}
            />
            <Image
              src="/assets/acompanhamento.png"
              alt="logo"
              width={230}
              height={100}
              onClick={() => category()}
            />
            <Image
              src="/assets/refrigerante.png"
              alt="logo"
              width={230}
              height={100}
              onClick={() => category()}
            />
            <Image
              src="/assets/sobremesa.png"
              alt="logo"
              width={230}
              height={100}
              onClick={() => category()}
            />
          </div>
        </section>
        <section className="mb-9">
          <h1 className="text-sm font-bold">Produtos</h1>
          <p className="text-xs mb-2">
            Selecione um produto para adicionar ao seu pedido
          </p>
          <div className="flex">
            {products.map(item => (
              <ProductImage item={item} />
            ))}
          </div>
        </section>
        <section className="flex justify-end">
          <button
            type="button"
            className="ml-9 w-56 h-8 rounded-xl border border-slate-400 text-slate-400"
          >
            Cancelar
          </button>
          <button
            type="button"
            className="ml-9 bg-slate-400 text-white w-56 h-8 rounded-xl"
          >
            Finalizar pedido
          </button>
        </section>
      </main>
    </>
  );
}
