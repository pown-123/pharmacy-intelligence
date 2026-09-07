# Pharmacy Intelligence Architecture

Pharmacy Intelligence is a multi-tenant SaaS platform for retail pharmacies that continue to use MARG for billing and inventory. V1 starts with the engineering foundation only: authentication, tenant-aware data access, onboarding, protected application routes, reusable UI structure, PostgreSQL/Prisma configuration, and placeholders for future workflows.

## Application Structure

- `src/app`: Next.js App Router routes, layouts, server actions, and pages.
- `src/components`: Reusable UI and application shell components.
- `src/lib`: Server utilities, environment validation, authentication, authorization, Prisma client, and tenant-aware data access.
- `src/server`: Server-only domain/data-access modules.
- `prisma`: Prisma schema and migrations.
- `tests`: Automated tests for foundation logic.

## Tenancy Model

Each pharmacy organization is represented by `Organization`. Branches and users belong to exactly one organization. Future business data models include an `organizationId` and, where operationally relevant, a `branchId`.

Tenant isolation is enforced server-side. Application data access derives the organization from the authenticated user session and never trusts `organizationId` or `branchId` submitted by a client. Branch access is validated against the authenticated user's organization before use.

## Authentication And Authorization

Authentication uses Auth.js/NextAuth with a credentials provider backed by the application `User` table and hashed passwords. Route protection is enforced by middleware for application routes. Role-based authorization supports:

- `OWNER`
- `MANAGER`
- `STAFF`

The onboarding flow creates an organization, first branch, and owner account as one transaction.

## Database Foundation

PostgreSQL is accessed through Prisma. IDs use UUIDs. Core tables include timestamps, foreign keys, indexes, unique constraints, and cascades where ownership implies lifecycle.

Initial implemented entities:

- `Organization`
- `Branch`
- `User`

Future-ready schema entities:

- `Product`
- `Category`
- `Supplier`
- `Customer`
- `Batch`
- `Sale`
- `Purchase`
- `StockSnapshot`
- `WantedItem`
- `Upload`

These future entities are modeled with tenant-safe keys and relationships, but analytics, MARG import parsing, marketplace, WhatsApp, AI, and payments are intentionally not implemented.

## UI Foundation

The protected app uses a component-based shell with sidebar, header, user menu, organization and branch context, loading/empty/error primitives, and placeholder pages for planned workflows.

Primary routes:

- `/onboarding`
- `/app/today`
- `/app/sales`
- `/app/inventory`
- `/app/purchase`
- `/app/customers`
- `/app/wanted`
- `/app/upload`
- `/app/reports`
- `/app/settings`

## Verification

The foundation should pass:

- Type checking
- Linting
- Unit tests for tenant isolation and onboarding validation
- Production build
