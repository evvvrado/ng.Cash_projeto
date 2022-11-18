# <center>ng.Cash</center>

![Banner](/_shared/readme_banner.svg)

## | 💸 Projeto simulando um sistema de transações financeiras

O objetivo desses projeto é demonstrar a minha capacidade atráves do processo seletivo fornecido pela [ng.Cash](https://ng.cash). Mas, para funcionar, é necessário a instalação prévia de certas aplicações, como: [Node.js](https://nodejs.org/en/), [Docker](https://www.docker.com).

## | 🚀 Estrutura de pastas

Nesse repositório há duas pastas principais.

```
projeto
│
└────── 𝘀𝗲𝗿𝘃𝗲𝗿
	│
    └── web
```

<strong>Oque é a pasta server?</strong>
<br>
É onde está salvo o back-end da aplicação. Nela, há um servidor [dockerizado](https://www.docker.com). rodando em [Node.js](https://nodejs.org/en/) com [Typescript](https://www.typescriptlang.org). Utilizei tecnologias como [PostgreSQL](https://www.postgresql.org) para a criação do banco de dados, para manipular o mesmo foi utilizado o [Prisma](https://www.prisma.io) que é uma ORM de nova geração.

<strong>E qual a reponsabilidade do server?</strong>
<br>
Ele funciona em conjunto ao front-end, que é onde vai ser enviado as informações necessárias para: Criar um usuário, Autentificar esse usuário com um [Token JWT](https://jwt.io), Colher informações sobre esse usuário e suas contas, Realizar transações. E também, guardar tudo isso no banco de dados.

```
projeto
│
└────── server
	│
    └── 𝘄𝗲𝗯
```

<strong>Oque é a pasta web?</strong>
<br>
Basicamente, a pasta web tem a responsabilidade em rodar a aplicação front-end. Nela, rodará funções utilizando [ReactJS](https://pt-br.reactjs.org) em [Typescript](https://www.typescriptlang.org).

<strong>E qual a reponsabilidade do server?</strong>
<br>
O front-end é o que usuário utilizará como ferramenta, para então, atingir o objetivo desejado atráves do sistema. Ela utiliza da API proveniente do back-end para enviar as informações necessárias para: Criar um usuário, Autentificar esse usuário, Colher informações sobre esse usuário e suas contas, Realizar transações.

## | 💻 Rodar projeto

Depois de realizar as instalações necessárias, para rodar o projeto na sua máquina, você deve seguir os seguintes passos.
<br><br>

<strong>1: Configurar Environment</strong><br>
Para isso, acesse a pasta <strong>/server</strong>, e nela crie um arquivo .env com as credencias do banco de dados utilizando o exemplo a baixo.

```
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://USUARIO:SENHA@DOMINIO:5432/BANCO"
```

<br>
<strong>2: Instalar as dependências</strong><br>
Para realizar as instalações das dependências do projeto, você deve então, acessar as pastas <strong>/server</strong> e <strong>/web</strong>, uma de cada vez, e rodar o comando:

    npm install

<br>
<strong>3: Rodar o container do Docker</strong><br>
Na pasta <strong>/server</strong> é necessário que rode o comando a baixo para rodar o container gerado pelo arquivo <strong>docker-compose.yml</strong>

    docker-compose up -d

<br>
<strong>4: Migrar o banco de dados</strong><br>
É necessário, também, migrar o seu banco de dados. Para isso, na pasta <strong>/server</strong> utilize do seguinte comando:

    npx prisma migrate dev

Para ter acesso visual ao seu banco de dados, o Prisma fornece uma ferramente interessante, ela poderá ser rodada com o seguinte comando:

    npx prisma studio

<br>
<strong>5: Rodar servidor na sua máquina</strong><br>
Com todos os passos anteriores realizados, sobra agora rodar o servidor na sua máquina. Então, na pasta <strong>/server</strong> utilize este comando:

    npx run dev

<br>
<strong>6: Rodar projeto web na sua máquina</strong><br>
Como último passo, agora a aplicação estará pronta para ser visualizada e utilizada. Então, resta apenas rodar o projeto web na sua máquina. Acesse a pasta <strong>/web</strong> e digite o comando:

    npm run dev

<br>
*Observação: Todos os links de acesso serão gerados e mostrados no terminal em que você rodar o comando <strong>npm run dev</strong>.
