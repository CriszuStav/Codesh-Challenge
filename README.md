# Desafio Backend - Challeng by Codesh

## Descrição
API de Parser de Produtos

Esta API se conecta à API da Open Food Facts para carregar dados sobre alimentos e armazená-los em uma base de dados interna. O processo de importação é automático e ocorre diariamente às `3:00AM` (para configurar o horario acesse `src/modules/cron/cron-service.ts`).

Após a base de dados ser populada, a API oferece endpoints para realizar consultas, alterações e deleções dos registros. Além disso, há um endpoint dedicado para verificar o status da API e obter a data da última sincrinzação dos dados e status do banco de dados.


## Tecnologias e Bibliotecas
- <b> Linguagem: </b> Typescript
- <b> Framework: </b> NestJS
- <b> Banco de Dados: </b> MongoDB
- <b> Testes: </b> Jest
- <b> Outras Bibliotecas: </b>
  - <b> @nestjs/schedule </b> para gerenciamento de CRON jobs
  - <b> p-limit </b> para controle de concorrência
  - <b> fetch </b> para requisições HTTP
  - <b> bson </b> para manuseio de números grandes no MongoDB

## Instalação e Execução
- Clone o repositório

```sh
$ git clone https://github.com/your-username/your-repo-name.git
```

- Instale as dependências:
```sh
$ npm install
```

- Configuração do Ambiente
    - Crie um arquivo .env na raiz do projeto e defina as variáveis de ambiente necessárias, exemplo:
```sh
  PORT=
  FILE_NAMES_URL=
  FILE_CONTENT_URL=
  MONGO_HOST=
  MONGO_DB_NAME=
  MONGO_USER=
  MONGO_PASSWORD=
```

-  Executar o projeto:
```sh
$ npm run start
```

- Executar o projeto via Docker Compose:
```sh
$ docker compose up -d
```

## Endpoints

- `GET /`: Detalhes da API, status da conexão com o banco de dados, horário da última execução do CRON, tempo online e uso de memória.
- `PUT /products/:code:` Atualizar produto com base no id.
- `DELETE /products/:code:` Excluir produto (altera p status para trash).
- `GET /products/:code:` Informações de um produto da base de dados.
- `GET /products?page=1&limit=50:` Listar todos os produtos da base de dados. Este endpoint possui paginação.

## Testes
- Executar os testes:
```sh
$ npm run test
```


This is a challenge by <a href="codesh.com">Coodesh</a>