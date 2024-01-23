export interface Product {
  image: string;
  name: string;
  price: number;
}

export interface OrderProgress {
  id: number;
  nameCustomer: string;
  finishId: number;
  infos: [
    {
      product: {
        id: number;
        image: string;
        name: string;
        price: number;
        code: number;
      };
      total: number;
      observation: string;
      drop: boolean;
      description: string;
      aditional: string;
      quantity: number;
      transshipment: number;
    },
  ];
}
