<br>


<p align="center">

  # 💳  CNAB Parser API  💳

</p>

<center>

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/npm-%3E%3D5.5.0-blue.svg)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D10.0.0-blue.svg)
![Prerequisite](https://img.shields.io/badge/docker-%3E%3D15.0.0-blue.svg)
![Prerequisite](https://img.shields.io/badge/dockercompose-%3E%3D1.0.0-blue.svg)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](http://localhost:3333/docs)
</center>


> CNAB Parser API é uma aplicação que tem como features o Upload de um arquivo CNAB via (.txt) ou via String Base64, que faz o parser do arquivo, normaliza os dados e os armazena em um banco de dados relacional para serem consultados de formas individuais (transações por cliente) ou listando todas as transações registradas, com um totalizador do saldo conforme suas operações.

<br>

## Features e Ferramentas:

- Server Backend (`Node.JS`) 
- BD (`Postgres`)
- Tests (`Jest`)
- Server Frontend (`Nginx`) 
- Docs (`Swagger`)

### - API

>- Upload de CNAB (.txt) via multipart-form - POST
>- Processamento dos dados do arquivo CNAB (.txt) via String Base64 - POST
>- Lista de todas as Transações de todos os clientes - GET
>- Lista Transações por Nome do Cliente  - GET
>- Lista do Saldo total das operações das Transações de todos os clientes  - GET
>- Lista do Saldo total das operações das Transações por Nome do Cliente  - GET

### - Web Server

>- Serviço Http (nginx) em http://localhost:8080

### - Documentação

>- Swagger Docs em http://localhost:3333/docs


<br>

## Pré-requisitos

- [node](https://nodejs.org/en/download/) >= 10.0.0
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) >= 5.5.0
- [docker](https://docs.docker.com/get-docker) >= 15.0.0
- [docker-compose](https://docs.docker.com/compose/install) >= 1.0.0

<br>

## Instalação

```sh
git clone https://github.com/HeudmannLima/cnab-parser-api.git
```

## ⚠️ Como executar
Após fazer o clone, acesse a pasta `/server` dentro do projeto `/cnab-parser-api`:

```
cd cnab-parser-api
cd server
docker-compose up
```

## Execução de Testes

Dentro da pasta `/server` dentro do projeto `/cnab-parser-api`:

```sh
npm test
```

## Frontend

Automaticamente o Web Server `NGINX` será disponibilizado em:

```sh
http://localhost:8080
```

## Documentação

Automaticamente a Documentação `Swagger` será disponibilizada em:

```sh
http://localhost:3333/docs
```

## ⚠️ Informações Adicionais

O arquivo `CNAB.txt` exemplo com o formato correto está na pasta RAIZ do projeto:

```sh
/cnab-parser-api/CNAB.txt
```
Anexe para uso tanto via Requisição `POST` pelo `Swagger`, quanto anexar na página `Http`.


<br>

## 🤝 Dados do Autor

👤 **Heudmann O. Lima**

* LinkedIn: https://www.linkedin.com/in/heudmann/
* Github: [@HeudmannLima](https://github.com/HeudmannLima)
* Contatos: [heudmannlima@gmail.com](heudmannlima@gmail.com)
* Telefone: (92) 99403-9117

<br>

## 📝 License

Copyright © 2022 [Heudmann O. Lima](https://github.com/HeudmannLima).

This project is [(MIT)](https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE) licensed.

***

<br>