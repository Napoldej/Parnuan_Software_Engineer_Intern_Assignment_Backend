System Design Overview

- Purpose: Clean layered architecture that separates HTTP concerns, business logic, and persistence.
- Flow: Router → Controller → Service → Repository → Prisma/Database. Shared DTO Types across layers.

Layers and Responsibilities

- Router: API Endpoints
	- Defines URL paths and HTTP methods; attaches controllers.
	- Applies cross‑cutting middleware (e.g., JSON parsing, auth, rate limit) and groups under base paths.
	- Hosts OpenAPI JSDoc annotations used to generate Swagger docs.
	- Files: src/router/userRouter.ts, src/router/transactionRouter.ts

- Controller: HTTP Handling
	- Parses request params/query/body and invokes the appropriate service method.
	- Translates service outcomes into HTTP responses (status codes, JSON payloads).
	- Catches errors from services and maps them to meaningful HTTP errors.
	- No business rules or DB access; only orchestration of request/response.
	- Files: src/controller/userController.ts, src/controller/transactionController.ts

- Service: Business Logic
	- Implements application rules, validations, and orchestration across repositories.
	- Defines transaction boundaries when needed, ensures idempotency and invariants.
	- Returns domain results to controllers without HTTP concerns.
	- Files: src/service/userService.ts, src/service/transactionService.ts

- Repository: Data Access Layer
	- Encapsulates all persistence operations using Prisma Client.
	- No business logic; focuses on CRUD, filtering, and soft‑delete behavior.
	- Swappable without affecting services (e.g., change DB or query strategy).
	- Files: src/repository/userRepository.ts, src/repository/transactionRepository.ts

- Prisma: Data Model and Client
	- Prisma schema defines models, enums, and relations for MongoDB provider.
	- Prisma Client is instantiated once via a singleton and injected/used by repositories.
	- Notes: Transaction.amount currently uses Float (TS number). For money, consider Decimal128 to avoid precision issues.
	- Files: src/prisma/schema.prisma, src/helper/prismaSingleTon.ts

- Types: DTOs and Contracts
	- Shared TypeScript interfaces for inputs/outputs across layers, keeping boundaries explicit.
	- Files: src/types/userType.ts, src/types/transactionType.ts

Cross‑Cutting Concerns

- Error Handling
	- Repositories throw underlying errors; Services may wrap/add context; Controllers map to HTTP codes.
	- Consider custom error classes (e.g., ValidationError 400, NotFound 404, Conflict 409, Internal 500).

- Validation
	- Suggest adding schema validation (e.g., zod or class‑validator) in controllers before calling services.
	- Keeps services operating on trusted, typed inputs.

- API Documentation (Swagger/OpenAPI)
	- OpenAPI JSDoc comments live in router files; swagger-jsdoc aggregates them.
	- Swagger UI mounted at /api-docs; raw JSON at /api-docs.json.
	- Config: src/swagger.ts

- Testing Strategy
	- Repository tests: mock Prisma singleton and assert queries/filters and soft‑delete behavior.
	- Service tests: mock repositories and verify business logic orchestration.
	- Controller tests: mock services and assert status codes and response payloads.
	- Runner: Vitest with tests under src/tests/**.

Typical Request Flow (Example: Add Transaction)

1) Router routes POST /api/transactions/add-transaction/:user_id to TransactionController.addTransaction.
2) Controller extracts user_id and body, then calls TransactionService.addTransaction(userId, input).
3) Service applies rules (e.g., type must be Income/Expense) and calls TransactionRepository.add_transaction.
4) Repository executes Prisma create on Transaction, handling any DB‑level constraints.
5) Service returns the created entity; Controller responds with 201 and JSON payload.

Folder Structure (Key Paths)

- src/index.ts: App bootstrap, middleware, routers, Swagger UI.
- src/router/*: Express routers with OpenAPI docs.
- src/controller/*: Request/response mappers calling services.
- src/service/*: Business logic and orchestration.
- src/repository/*: Prisma data access operations.
- src/helper/prismaSingleTon.ts: Prisma Client singleton.
- src/prisma/schema.prisma: Data models and relations.
- src/types/*: DTO types for inputs/outputs.
- src/tests/**: Unit tests (repository, service, controller).

Conventions and Guidelines

- Keep each layer single‑purpose and dependency‑inverted (Controller → Service → Repository → Prisma).
- Avoid leaking HTTP concepts below controllers; avoid DB concepts above repositories.
- Prefer explicit DTOs at boundaries; avoid passing raw request objects beyond controllers.
- For monetary values, prefer Decimal128 or integer cents to avoid floating‑point rounding.