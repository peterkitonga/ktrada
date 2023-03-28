<div align="center">
<h1>Ktrada</h1>
<p>This application was created to display stock prices of companies through the Yahoo Finance API. It is built with Angular for the UI & Express.js for the API.</p>
</div>

## Features

- [TypeScript](https://www.typescriptlang.org/) - For type safety and other awesome features not native to vanilla JavaScript.
- [Express](https://expressjs.com/) - Micro-framework for setting up routes, middlewares, controllers.
- [Angular](https://angular.io/) - Component base front-end framework.
- [Prime NG](https://primeng.org/) - Component library for Angular.

## Roadmap

- [x] Initialize frontend application
- [x] Initialize backend application
- [x] Add Jest to frontend application
- [x] Add Cypress to frontend application
- [x] Add dependencies for the backend(Express, Jest, Nodemon, Typescript)
- [x] Add & configure HTTP server for the backend
- [x] Add Jest to backend application
- [x] Add ORM for database abstraction & querying
- [x] Add database seeders for initial data to be stored
- [x] Add dependency injection for the backend services & repositories
- [x] Add paginated response for the stock prices
- [x] Add API endpoints for fetching the stock prices
- [x] Add & configure linting in the frontend
- [x] Add typefaces & icons for the frontend
- [x] Add component library
- [x] Add routing for the frontend application
- [x] Add responsive table with pagination and sample data
- [x] Add services & interceptors for pulling stock prices
- [x] Add searchable select for querying securities list
- [x] Add project setup instructions

## Environment Setup

To begin running the project, first in the _**backend/**_ folder copy the example variables into a `.env` file with command: `cp .env.example .env`. You will then need to modify the following environment variables in the `.env` file for your API to run:

- `NODE_ENV` - `production` or `development`

- `CLIENT_BASE_URL` - base url for the front-end client application

- `DATABASE_*` - variables for the mysql database

## Run Frontend Locally

Go to the **frontend/** directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the development server

```bash
  npm start
```

## Run Backend Locally

Go to the **backend/** directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Run database migrations

```bash
  npm run db:migrate
```

Run database seeders to add initial data

```bash
  npm run db:seed
```

Start the development server

```bash
  npm start
```

## Authors

[Peter Kitonga](https://www.github.com/peterkitonga)