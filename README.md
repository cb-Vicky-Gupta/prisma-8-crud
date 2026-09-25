# curd-prisma

An Express 5 API starter with Prisma 8 (PostgreSQL) and JWT auth helpers.

## Getting started

```bash
cp .env.example .env     # defaults match docker-compose.yml
npm install
npm run db:up            # start Postgres in Docker
npm run dev              # http://localhost:3000
```

## Project structure

```
src/
  index.ts                 entry point: loads env, connects DB, starts server
  app.ts                   express app: middleware, routes, error handling
  routes.ts                mounts module routers under /api
  config/env.ts            validated environment variables (zod)
  lib/
    http-error.ts          HttpError.notFound() etc. - throw from any handler
    auth-token.ts          sign / verify JWTs
    validation.ts          shared zod schemas (uuid id param, pagination)
  middleware/
    auth.ts                requireAuth + currentUser(req)
    error-handler.ts       404 + JSON error responses
  modules/<name>/          one folder per resource (empty - add yours)
    <name>.routes.ts       HTTP handlers
    <name>.service.ts      database queries
    <name>.schema.ts       request body validation
  prisma/
    contract.prisma        data model (Prisma schema) - edit this to change the schema
    db.ts                  database client
    seed.ts                seed script
```

To add a resource: add the model in `src/prisma/contract.prisma`, create `src/modules/<name>/`, then mount its router in `src/routes.ts`.
Express 5 forwards errors from async handlers, so you can just `throw` from a handler.

## Routes

- `GET /health`: health check
- Everything else is mounted under `/api` in `src/routes.ts`
- Protect a route with `requireAuth` from `src/middleware/auth.ts`, then read the user with `currentUser(req)`

## Changing the data model

1. Edit `src/prisma/contract.prisma`
2. `npm run contract:emit` regenerates the types in `src/prisma/generated/`
3. `npx prisma migration plan --name <what_changed>` writes a migration to `migrations/app/`
4. `npm run migrate` applies it

For quick local experiments you can use `npm run db:update` instead of steps 3–4. It changes the database directly and doesn't write a migration file.

## Other scripts

- `npm run db:seed` runs `src/prisma/seed.ts`
- `npm run typecheck` runs the type checker
- `npm run build` / `npm start` build and run the production bundle
- `npm run db:down` stops Postgres. `npm run db:reset` also deletes its data.
- `npm run dev:composer` / `npm run deploy` run locally with Prisma Composer, or deploy to Prisma Compute
# prisma-8-crud
