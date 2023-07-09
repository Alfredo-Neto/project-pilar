# DropMail.me Challenge

Este é o projeto que fiz para a vaga de Frontend Engineer Pleno na Pilar.
O desafio consiste em consumir o serviço da DropMail.me, que é uma api que gera e-mails temporários, a partir de um id de sessão.

Clique [aqui](https://github.com/Alfredo-Neto/project-pilar/blob/main/src/assets/README.md) para ver o enunciado do desafio

## Funcionalidades básicas

- Gerar um e-mail temporário
- Copiar o endereço gerado para a área de transferência
- Visualizar a caixa de entrada desse email
- Botão de ativar notificações
- Salvar dados no localStorage para não perdê-los ao recarregar a página

## Funcionalidades extras

- Testes com Jest
- Deploy na vercel
- Arquitetura voltada para a store do Vuex, pensando em escalabilidade

## Tecnologias utilizadas

- Vue.js
- Vuex
- Apollo e GraphQl
- Jest
- Bootstrap/Bootstrap-vue
- Deploy na Vercel

## Instalação local

Veja a [Live demo](project-pilar.vercel.app)

1. Clone este repositório em sua máquina local:

```shell
git clone https://github.com/Alfredo-Neto/project-pilar.git
```
2. Acesse o diretório do projeto:

```shell
cd project-pilar
```
3. Instale as dependencias do projeto

```shell
npm install
```
4. Rode os testes

```shell
npm t
```
Obs: Se seu node não estiver na versão LTS e você receber este erro: node: --openssl-legacy-provider is not allowed in NODE_OPTIONS ao tentar rodar o projeto, clique [aqui](https://stackoverflow.com/questions/72866798/node-openssl-legacy-provider-is-not-allowed-in-node-options) e siga as instruções da primeira resposta.

5. Rode o servidor

```shell
npm run serve
```
6. Acesse: http://localhost:8080

>  This is a challenge by [Coodesh](https://coodesh.com/)

