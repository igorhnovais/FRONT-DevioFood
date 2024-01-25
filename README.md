# Devio Food

<details open="open">
  <summary><h2 style="display: inline-block">📜 Sumário</h2></summary>

- [Sobre o projeto](#sobre-o-projeto)
- [Usando](#usando)
- [Rotas](#rotas)


</details>

<a name="sobre-o-projeto"></a>

## 📋 Sobre o projeto
### tecnologias e ferramentas

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![NEXT](https://img.shields.io/badge/-Next-blue?style=for-the-badge&color=5ed2f2&logo=next&logoColor=000000)
![TypeScript](https://img.shields.io/badge/typescript-%23323330.svg?style=for-the-badge&loo=javascript&logoColor=%23F7DF1E&logo=typescript&logoColor=%23F7DF1E)
![Tailwind](https://img.shields.io/badge/tailwind-yellow?style=flat&logo=tailwind&logoColor=white)

### Idealização do projeto
- Esse projeto foi pensado para ser sistema interno integrado com os clientes, onde o usuario poderá escolher seu pedido, e após pagamento o pedido ira para a cozinha e quando finalizado aparecerá no painel para retirada.

### link do deploy
- https://devio-food-2s7mwry4d-igorhnovais.vercel.app

### link do Back-end desse projeto
- https://github.com/igorhnovais/API-DevioFood
<a name="usando"></a>

## 🏁 Usando

Clone o repositorio

```bash
$ git clone https://github.com/igorhnovais/FRONT-DevioFood.git

```

Instale as dependências

```bash
$ npm i
```

E por fim, rode o comando para iniciar a aplicação

```bash
$ npm run dev
```

<a name="contribuindo"></a>

### -> health

1. Rota para teste se o servidor esta rodando do projeto:
    
    Route get: ```"/health"``` 

    Desrição: nela você consegue ver se sua aplicação esta rodando

    Status:
    ```bash
        200
    ```
    
    Saída:
    ```bash
        "server running ok"
    ```

### -> products
1. Rota para buscar por um produto especifico:
    
    Route post: ```"/products/:filter"``` 

    Desrição: nela você consegue pesquisar por um produto atraves do nome ou pelo codigo

    Status:
    ```bash
        200
    ```
    Entrada:
    ```bash
        "/products/303020" || "/products/hamburguer"
    ```
    
    Saída:
    ```bash
        [
            {
                "id": 2,
                "image": "https://img.freepik.com/fotos-gratis/hamburguer-isolado-no-fundo-branco-fastfood-de-hamburguer-fresco-com-carne-e-queijo_90220-1329.jpg",
                "name": "hamburguer medio",
                "price": 3250,
                "code": 202031
            }
        ]
    ```

2. Rota para pegar todos os produtos da hamburgueria:
    
    Route get: ```"/products"``` 

    Desrição: nela você consegue visualizar todos os produtos existentes na hamburgueria. 

    Status:
    ```bash
        200
    ```
    
    Saída:
    ```bash
        [
            {
                "id": 1,
                "image": "https://img.freepik.com/fotos-gratis/hamburguer-isolado-no-fundo-branco-fastfood-de-hamburguer-fresco-com-carne-e-queijo_90220-1329.jpg",
                "name": "hamburguer simples",
                "price": 3050,
                "code": 202056
            },
            {
                "id": 2,
                "image": "https://img.freepik.com/fotos-gratis/hamburguer-isolado-no-fundo-branco-fastfood-de-hamburguer-fresco-com-carne-e-queijo_90220-1329.jpg",
                "name": "hamburguer medio",
                "price": 3250,
                "code": 202031
            },
            {
                "id": 3,
                "image": "https://img.freepik.com/fotos-gratis/hamburguer-isolado-no-fundo-branco-fastfood-de-hamburguer-fresco-com-carne-e-queijo_90220-1329.jpg",
                "name": "hamburguer grande",
                "price": 3450,
                "code": 202088
            },
            {
                "id": 4,
                "image": "https://img.freepik.com/fotos-gratis/hamburguer-isolado-no-fundo-branco-fastfood-de-hamburguer-fresco-com-carne-e-queijo_90220-1329.jpg",
                "name": "hamburguer gigante",
                "price": 3650,
                "code": 202014
            }
        ]
    ```

### -> order

1. Rota para adicionar um produto a ordem:
    
    Route post: ```"/orders"``` 

    Desrição: nela você consegue adicionar uma nova ordem 

    Status:
    ```bash
        201
    ```
    Entrada:
    ```bash
        {
            productId: 2,
            nameCustumer: "cleber",
            observation: "sem obs",
            transshipment: 0,
            total: 3050,
            drop: false,
            description: "bla bla",
            aditional: "bacon",
            quantity: 2
        }
    ```
    
    Saída:
    ```bash
        {
            id: 2,
            productId: 2,
            nameCustumer: "cleber",
            observation: "sem obs",
            transshipment: 0,
            total: 3050,
            drop: false,
            description: "bla bla",
            aditional: "bacon",
            quantity: 2
        }
    ```

2. Rota para adicionar um produto a ordem:
    
    Route post: ```"/orders/finish"``` 

    Desrição: nela você consegue adicionar uma nova ordem 

    Status:
    ```bash
        201
    ```
    Entrada:
    ```bash
        {
            "name": "igor"
        }
    ```
    
    Saída:
    ```bash
        {
            "id": 2,
            "nameCustomer": "igor",
            "isFinish": true,
            "isREady": false
        }
    ```

3. Rota para deletar um produto do pedido:
    
    Route delete: ```"/orders/:id"``` 

    Desrição: nela você consegue remover uma ordem

    Status:
    ```bash
        200
    ```
    
    Saída:
    ```bash
        {
            id: 1,
            productId: 2,
            nameCustumer: "cleber",
            observation: "sem obs",
            transshipment: 0,
            total: 3050,
            drop: false,
            description: "bla bla",
            aditional: "bacon",
            quantity: 2
        }
    ```
4. Rota para atualizar o pedido:
    
    Route put: ```"/orders-update"``` 

    Desrição: nela você consegue atualizar uma ordem para que fique com status de baixado

    Status:
    ```bash
        200
    ```
    entrada:
    ```bash
        {
            "nameCustumer": "cleber"
        }
    ```
    
    Saída:
    ```bash
        {
            id: 1,
            productId: 2,
            nameCustumer: "cleber",
            observation: "sem obs",
            transshipment: 0,
            total: 3050,
            drop: true,
            description: "bla bla",
            aditional: "bacon",
            quantity: 2
        }
    ```

4. Rota para atualizar o pedido para pronto:
    
    Route put: ```"/orders-update-ready"``` 

    Desrição: nela você consegue atualizar uma ordem para que fique com status de pronto

    Status:
    ```bash
        200
    ```
    entrada:
    ```bash
        {
            "id": 2
        }
    ```
    
    Saída:
    ```bash
        {
            "id": 2,
            "nameCustomer": "igor",
            "isFinish": true,
            "isREady": true
        }
    ```

5. Rota para ver o resumo do pedido do cliente:
    
    Route get: ```"/orders"``` 

    Desrição: nela você consegue atualizar uma ordem para que fique com status de baixado

    Status:
    ```bash
        200
    ```
    entrada:
    ```bash
        {
            "nameCustumer": "cleber"
        }
    ```
    
    Saída:
    ```bash
        {
            "nameCustomer": "cleber",
            "balance": 7100,
            "infos": [
                {
                "total": 3050,
                "observation": "sem obs",
                "drop": true,
                "description": "bla bla",
                "aditional": "bacon",
                "quantity": 2,
                "transshipment": 0
                },
                {
                "total": 4050,
                "observation": "sem obs",
                "drop": false,
                "description": "bla bla",
                "aditional": "bacon",
                "quantity": 1,
                "transshipment": 0
                }
            ]
        }
    ```
6. Rota para ver o resumo do pedido do cliente:
    
    Route get: ```"/orders/finish"``` 

    Desrição: nela você consegue atualizar uma ordem para que fique com status de baixado

    Status:
    ```bash
        200
    ```

    Saída:
    ```bash
        [
            {
                "id": 1,
                "nameCustomer": "cleber",
                "finishId": 1
                "infos": [
                {
                    "product": {
                    "id": 2,
                    "image": "https://img.freepik.com/fotos-gratis/hamburguer-isolado-no-fundo-branco-fastfood-de-hamburguer-fresco-com-carne-e-queijo_90220-1329.jpg",
                    "name": "hamburguer medio",
                    "price": 3250,
                    "code": 202031
                    },
                    "total": 3050,
                    "observation": "sem obs",
                    "drop": true,
                    "description": "bla bla",
                    "aditional": "bacon",
                    "quantity": 2,
                    "transshipment": 0
                },
                {
                    "product": {
                    "id": 3,
                    "image": "https://img.freepik.com/fotos-gratis/hamburguer-isolado-no-fundo-branco-fastfood-de-hamburguer-fresco-com-carne-e-queijo_90220-1329.jpg",
                    "name": "hamburguer grande",
                    "price": 3450,
                    "code": 202088
                    },
                    "total": 4050,
                    "observation": "sem obs",
                    "drop": false,
                    "description": "bla bla",
                    "aditional": "bacon",
                    "quantity": 1,
                    "transshipment": 0
                }
                ]
            },
            {
                "id": 2,
                "nameCustomer": "igor",
                "infos": [
                {
                    "product": {
                    "id": 3,
                    "image": "https://img.freepik.com/fotos-gratis/hamburguer-isolado-no-fundo-branco-fastfood-de-hamburguer-fresco-com-carne-e-queijo_90220-1329.jpg",
                    "name": "hamburguer grande",
                    "price": 3450,
                    "code": 202088
                    },
                    "total": 4050,
                    "observation": "sem obs",
                    "drop": false,
                    "description": "bla bla",
                    "aditional": "bacon",
                    "quantity": 1,
                    "transshipment": 0
                }
                ]
            }
    ]
    ```
