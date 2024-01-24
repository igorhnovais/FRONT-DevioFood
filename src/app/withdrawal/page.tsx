'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '@/components/header/header';

type OrderProgress = {
  nameCustomer: string;
};

export default function Withdrawal() {
  const [orders, setOrders] = useState<OrderProgress[]>([]);
  const [ready, setReady] = useState<OrderProgress[]>([]);

  useEffect(() => {
    const promisePreparing = axios.get('http://localhost:5000/orders-finish');
    // const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
    promisePreparing.then(resp => {
      setOrders(resp.data);
    });
    promisePreparing.catch(err => {
      console.log(err.response.data.message);
    });

    const promiseReady = axios.get('http://localhost:5000/orders-ready');
    promiseReady.then(resp => {
      setReady(resp.data);
    });
    promiseReady.catch(err => {
      console.log(err.response.data.message);
    });
  }, []);

  return (
    <>
      <Header />
      <main className="flex justify-around pl-36 pr-36 pt-10 pb-10">
        <div className="w-full">
          <h1 className="text-4xl font-bold">Preparando:</h1>
          <div className="">
            {orders.length > 0 ? (
              orders.map(item => (
                <h2 className="text-gray-500 text-7xl">{item.nameCustomer}</h2>
              ))
            ) : (
              <p className="mt-9">Não tem pedido sendo preparado</p>
            )}
          </div>
        </div>
        <div className="divider" />
        <div className="w-full">
          <h1 className="text-4xl font-bold ml-5">Pronto:</h1>
          <div className="ml-5">
            {ready.length > 0 ? (
              ready.map(item => (
                <h2 className="text-lime-700 text-7xl">{item.nameCustomer}</h2>
              ))
            ) : (
              <p className="mt-9">Não tem pedido pronto</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
