'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '@/components/header/header';
import OrderProgress from '@/components/orderProgress/orderProgress';

export default function Kitchen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const promise = axios.get('http://localhost:5000/orders/finish');
    // const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
    promise.then(resp => {
      setOrders(resp.data);
      console.log('oi', resp.data);
    });
    promise.catch(err => {
      console.log(err.response.data.message);
    });
  }, []);

  return (
    <>
      <Header />
      <main className="flex justify-around pl-36 pr-36 pt-10 pb-10">
        <div className="w-full">
          <h1 className="text-lg font-bold">Preparando:</h1>
          <div className="">
            {orders.map(item => (
              <OrderProgress item={item} />
            ))}
          </div>
        </div>
        <div className="divider" />
        <div className="w-full">
          <h1 className="text-lg font-bold ml-3">Pronto:</h1>
        </div>
      </main>
    </>
  );
}
