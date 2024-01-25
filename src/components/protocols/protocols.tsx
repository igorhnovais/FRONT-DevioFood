export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
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

export interface Aditional {
  image: string;
  name: string;
  g: number;
  price: number;
}

export interface ResumeOrder {
  total: number;
  observation: string;
  drop?: boolean;
  description: string;
  aditional: string;
  quantity: number;
  transshipment: number;
}

export interface OrderFinish {
  nameCustomer: string;
  balance: number;
  infos: [
    {
      total: number;
      observation: string;
      drop?: boolean;
      description: string;
      aditional: string;
      quantity: number;
      transshipment: number;
    },
  ];
}

export const aditionals = [
  {
    image:
      'https://media.istockphoto.com/id/508755080/pt/foto/cozinhados-bacon-rashers-close-up-de-um-isolado-num-fundo-branco.jpg?s=612x612&w=0&k=20&c=P4d60UO8Zuk0vnbvKZ9g5ygvxRouVwZ3Y2M3Eeirdy0=',
    name: 'bacon',
    g: 20,
    price: 100,
  },
  {
    image:
      'https://img.freepik.com/fotos-premium/queijo-cheddar-isolado-no-fundo-branco_941493-374.jpg?w=2000',
    name: 'cheddar',
    g: 40,
    price: 200,
  },
  {
    image:
      'https://img.freepik.com/fotos-premium/molho-de-churrasco-isolado-no-fundo-branco-com-tracado-de-recorte_88281-4536.jpg',
    name: 'molho',
    g: 50,
    price: 150,
  },
];
