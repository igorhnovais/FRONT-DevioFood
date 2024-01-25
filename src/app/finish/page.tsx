'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoWallet } from 'react-icons/io5';
import { IoIosCard } from 'react-icons/io';
import { MdRadioButtonUnchecked } from 'react-icons/md';
import { FaMoneyBillAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';

import Header from '@/components/header/header';
import ResumeOrders from '@/components/resumeOrder/resumeOrder';
import { OrderFinish } from '@/components/protocols/protocols';

interface Order {
  balance?: number;
}

export default function Finish() {
  const [orders, setOrders] = useState([] as OrderFinish[]);
  const [value, setValue] = useState('');
  const transshipment = Number(value) - ((orders[0] as Order)?.balance || 0);

  const name = localStorage.getItem('name');

  useEffect(() => {
    if (name) {
      const promiseOrder = axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${name}`,
      );
      promiseOrder.then(resp => {
        setOrders(resp.data);
      });
      promiseOrder.catch(err => {
        console.log(err.response.data.message);
      });
    }
  }, [value]);

  function payment() {
    Swal.fire('Função disponível em breve!');
  }

  function finishOrder() {
    const promise = axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/finish/${name}`,
    );
    promise.then(() => {
      localStorage.clear();
      Swal.fire('Pedido adicionado com sucesso!');
      redirect('/');
    });
    promise.catch(err => {
      console.log(err.response.data.message);
    });
  }

  return (
    <>
      <Header />
      <main className="pl-36 pr-36 pt-10 pb-10">
        <div className="flex items-center mb-5">
          <IoWallet className="text-green-700 mr-4" />
          <h1 className="font-bold text-lg">Pagamento</h1>
        </div>
        <section className="flex justify-between">
          <div>
            <h3 className="text-xs font-bold mb-3">Resumo da compra</h3>
            <section className="border border-slate-400 p-10 mb-5 w-full">
              {orders[0]?.infos.map(item => <ResumeOrders item={item} />)}
              <div className="flex justify-between items-center p-4 border-t-2 border-dashed text-sm">
                <h2 className="mr-5">Total do pedido:</h2>
                <h1 className="text-xl font-bold">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(Number(orders[0]?.balance) / 100)}
                </h1>
              </div>
            </section>
            <div className="flex flex-col items-end justify-center">
              <h6 className="text-xs font-bold w-14">Codigo</h6>
              <div className="bg-slate-200 w-14 h-6 flex justify-center items-center">
                <p className="text-xs">200</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold mb-3">
              Selecione a forma de pagamento:
            </h3>
            <button
              type="button"
              className="flex justify-between items-center border border-slate-400 p-4 mb-5 w-80"
              onClick={() => payment()}
            >
              <div className="flex items-center">
                <IoIosCard className="text-green-700 mr-4" />
                <h2>Debito</h2>
              </div>
              <div>
                <MdRadioButtonUnchecked className="text-green-700" />
              </div>
            </button>
            <button
              type="button"
              className="flex justify-between items-center border border-slate-400 p-4 mb-5 w-80"
              onClick={() => payment()}
            >
              <div className="flex items-center">
                <IoIosCard className="text-green-700 mr-4" />
                <h2>Credito</h2>
              </div>
              <div>
                <MdRadioButtonUnchecked className="text-green-700" />
              </div>
            </button>
            <div className="flex justify-between items-center border border-slate-400 p-4 mb-5 w-80">
              <div className="flex items-center">
                <FaMoneyBillAlt className="text-green-700 mr-4" />
                <h2>Dinheiro</h2>
              </div>
              <div>
                <MdRadioButtonUnchecked className="bg-green-700 rounded-lg" />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <h2 className="text-xs font-bold">Valor entregue</h2>
                <input
                  placeholder="R$ 0,00"
                  className="text-center bg-slate-200 w-20 h-6 text-xs"
                  onChange={e => setValue(e.target.value)}
                />
              </div>
              <div>
                <h2 className="text-xs font-bold w-14">Troco</h2>
                <div className="bg-slate-200 w-14 h-6 flex justify-center items-center">
                  <p className="text-xs">
                    {value !== '' ? (
                      <p className="text-xs">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(transshipment / 100)}
                      </p>
                    ) : (
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex justify-end mt-8">
          <button
            type="button"
            className="ml-9 w-56 h-8 rounded-xl border border-green-700 text-sm font-bold text-green-700"
          >
            <Link href="/">Cancelar</Link>
          </button>
          <button
            type="button"
            className="ml-9 bg-green-700 text-white text-sm font-bold w-56 h-8 rounded-xl"
            onClick={() => finishOrder()}
          >
            Finalizar o pedido
          </button>
        </section>
      </main>
    </>
  );
}
