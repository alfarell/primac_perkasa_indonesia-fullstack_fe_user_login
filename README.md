# [PT Primac Perkasa Indonesia] Technical Test - FE User Auth with Vue3

Author: Alfarell Muchamad Yuwanto

A simple **authentication-based web app** built with **Vue 3**.  
This project implements a basic login and registration flow with a protected page that requires authentication.

## Tech Stack

- [Vue 3](https://vuejs.org/)
- [PrimeVue](https://primevue.org/)
- [Axios](https://axios-http.com/)
- [Pania](https://pinia.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

## Setup & Installation

### With npm

```bash
# Setup .env

cp .env.example .env
```

Fill the `VITE_API_URL` variable inside .env file with format `http://{host}:{port}/api` of the Auth Service BE url, example: `http://localhost:3000/api`

```bash
# Install dependencies

npm install
```

```bash
# Run development server

npm run dev
```

### With yarn

```bash
# Install dependencies

yarn
```

```bash
# Run development server

yarn dev
```

## Example Screen

| Page        | Description          |
| ----------- | -------------------- |
| `/login`    | Login form           |
| `/register` | Register new account |
| `/`         | Protected home page  |

## Authentication Flow

- Register

  User can register by filling:
  - name
  - username
  - email
  - password

  ```
  API: POST /api/auth/register
  ```

- Login

  User logs in and receives an access token, which is stored in Pinia (persisted in localStorage).

  ```
  API: POST /api/auth/login
  ```

- Protected Home Page

  Only accessible if the user is authenticated.
  Otherwise, the app automatically redirects to /login.

- Logout

  Clears token and user data from store → redirects to /login.
