# Agil API

API para o sistema Agil.

## Tecnologias Utilizadas

*   **Node.js**
*   **TypeScript**
*   **Express**
*   **Prisma**
*   **Zod**
*   **PostgreSQL**
*   **Docker**

## Começando

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

*   [Node.js](https://nodejs.org/en/) (v18 ou superior)
*   [Docker](https://www.docker.com/get-started)

### Instalação

1.  Clone o repositório:

    ```bash
    git clone https://github.com/luannpl/agil-api.git
    ```

2.  Navegue até o diretório do projeto:

    ```bash
    cd agil-api
    ```

3.  Instale as dependências:

    ```bash
    npm install
    ```

4.  Crie um arquivo `.env` a partir do exemplo `.env.example` e preencha as variáveis de ambiente:

    ```bash
    cp .env.example .env
    ```

### Executando a Aplicação

1.  Inicie o contêiner do banco de dados com o Docker Compose:

    ```bash
    docker-compose up -d
    ```
    ou

    ```bash
    docker compose up -d
    ```



2.  Execute as migrações do Prisma para criar as tabelas do banco de dados:

    ```bash
    npx prisma migrate dev
    ```

3.  Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

O servidor estará disponível em `http://localhost:3000`.

## Schema do Banco de Dados

O schema do banco de dados é definido no arquivo `prisma/schema.prisma`.

