'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '@/components/header/header';
import OrderProgress from '@/components/orderProgress/orderProgress';
import OrderReady from '@/components/orderReady/orderReady';

export default function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [ready, setReady] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const promisePreparing = axios.get('http://localhost:5000/orders/finish');
    // const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
    promisePreparing.then(resp => {
      setOrders(resp.data);
    });
    promisePreparing.catch(err => {
      console.log(err.response.data.message);
    });

    const promiseReady = axios.get('http://localhost:5000/orders/ready');
    promiseReady.then(resp => {
      setReady(resp.data);
    });
    promiseReady.catch(err => {
      console.log(err.response.data.message);
    });
  }, [loading]);

  return (
    <>
      <Header />
      <main className="flex justify-around pl-36 pr-36 pt-10 pb-10">
        <div className="w-full">
          <h1 className="text-lg font-bold">Preparando:</h1>
          <div className="">
            {orders.length > 0 ? (
              orders.map(item => (
                <OrderProgress item={item} setLoading={setLoading} />
              ))
            ) : (
              <p className="mt-9">Não tem pedido sendo preparado</p>
            )}
          </div>
        </div>
        <div className="divider" />
        <div className="w-full">
          <h1 className="text-lg font-bold ml-5">Pronto:</h1>
          <div className="ml-5">
            {ready.length > 0 ? (
              ready.map(item => <OrderReady item={item} />)
            ) : (
              <p className="mt-9">Não tem pedido pronto</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
