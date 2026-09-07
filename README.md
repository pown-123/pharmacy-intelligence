# Pharmacy Intelligence

Engineering foundation for a multi-tenant SaaS platform for retail pharmacies. V1 assumes pharmacies continue using MARG and later upload Excel/CSV exports. This repository intentionally does not implement analytics, MARG import parsing, marketplace, WhatsApp, AI, or payments.

## Architecture

- Next.js App Router with TypeScript strict mode.
- PostgreSQL with Prisma ORM.
- Auth.js/NextAuth credentials authentication backed by hashed application users.
- Server-side tenant context derived from the authenticated session.
- Tailwind CSS component architecture for a professional SaaS shell.
- Zod validation for environment and onboarding inputs.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the proposed structure and security model.

## Local Development

Install dependencies:

```bash
pnpm install
```

Create a local `.env` from `.env.example`:

```bash
cp .env.example .env
```

Start the development server:

```bash
pnpm dev
```

Open `http://localhost:3000/onboarding` to create the first organization, branch, and owner account.

## Environment Variables

| Variable          | Purpose                                               |
| ----------------- | ----------------------------------------------------- |
| `DATABASE_URL`    | PostgreSQL connection string used by Prisma.          |
| `NEXTAUTH_URL`    | Public application URL for Auth.js callbacks.         |
| `NEXTAUTH_SECRET` | Long random secret for signing authentication tokens. |

Generate a strong local secret with:

```bash
openssl rand -base64 32
```

## Database Setup

Run PostgreSQL locally and create a database, then set `DATABASE_URL`.

Example:

```bash
createdb pharmacy_intelligence
```

Generate the Prisma client:

```bash
pnpm db:generate
```

Create and apply migrations during development:

```bash
pnpm db:migrate
```

Apply committed migrations in deployed environments:

```bash
pnpm db:deploy
```

Inspect data locally:

```bash
pnpm db:studio
```

## Railway PostgreSQL Setup

Railway PostgreSQL services expose database connection variables, including `DATABASE_URL`, to services in the same Railway project. For local migrations from your machine, enable public networking on the PostgreSQL service and use the generated `DATABASE_PUBLIC_URL` locally.

1. Create or open the Railway project for Pharmacy Intelligence.
2. Click `+ New`, choose `Database`, then choose `PostgreSQL`.
3. Open the PostgreSQL service and confirm it is running.
4. For a Railway-hosted Next.js service, set its `DATABASE_URL` as a reference variable:

   ```text
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   ```

5. For local development or one-time migration from your workstation, open the PostgreSQL service settings, enable public TCP access, and copy the generated public connection string into a local `.env.local` file:

   ```bash
   DATABASE_URL="postgresql://..."
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="replace-with-a-long-random-secret"
   ```

6. Never commit `.env`, `.env.local`, or any Railway connection string. These files are ignored by Git.
7. Apply the committed Prisma migrations to Railway:

   ```bash
   pnpm db:deploy
   ```

8. Verify the Prisma client can connect and inspect the database:

   ```bash
   pnpm prisma studio
   ```

9. Run the real database tenant isolation test suite:

   ```bash
   pnpm test:db
   ```

10. After local migration/testing is complete, disable public TCP access unless you still need external database access.

Recommended Railway deployment setting:

```bash
pnpm prisma migrate deploy
```

Use that as the Railway pre-deploy migration command for the application service so schema migrations run before each deployment starts serving traffic.

## Project Structure

```text
prisma/
  schema.prisma
src/
  app/
    api/auth/[...nextauth]/
    app/
    onboarding/
    sign-in/
  components/
    app/
    ui/
  lib/
  server/
tests/
```

## Tenant Isolation

Tenant isolation is enforced on the server. The authenticated session contains the user's organization and branch context. Data access helpers scope queries with the authenticated `organizationId`, and branch usage is validated against that organization.

Client-submitted `organizationId` or `branchId` values must never be trusted directly. Future business features should use the helpers in `src/server/tenant-data.ts` or equivalent domain-specific repositories that accept a server-created tenant context.

## Verification

Run the foundation checks:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```
