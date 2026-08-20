# Bloglist - Part 7

Bloglist frontend and backend in the same repository for exercises 7.7-7.20.

## Development

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend in another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend proxies `/api` requests to the backend on port 3003.

## Production build

From the backend directory:

```bash
npm run build:ui
npm start
```

The backend serves the compiled frontend from `frontend/dist`.

Before running the backend, create `backend/.env` using `.env.example` as a reference.
