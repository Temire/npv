# Architecture overview

## Basis and confidence
Static review of local monorepo commit `64b3a742541560776fa32c352421b539a68da707` on `dev`. The root working tree is clean and `origin/dev` locally points at the same SHA, but no remote fetch was performed and remote freshness is unknown. This describes source structure and declared dependencies; it does not establish runtime topology or end-to-end behavior.

## Components and likely flow
- `frontend/npv-web`: React 18 / TypeScript / Vite SPA. Service clients call the public API base `https://npv-api.pario.ng/api/v1/` for user, property, file, and subscription operations.
- `backend/api-gateway`: Spring Cloud Gateway entry point and route/security configuration.
- `npv-auth-service` and `npv-authorization-server`: separate auth implementations and API surfaces. The canonical issuer, migration status, and token compatibility are not established.
- `npv-user-service`: registration/profile/admin APIs, MySQL/JPA/Flyway declarations, Kafka dependency.
- `npv-document-service`: property/document/certificate APIs and MySQL/JPA; includes client code for user and notification services.
- `npv-file-service`: file upload and storage service.
- `cdn-service`: separate project directory and artifact, likely media/CDN role; precise relationship to file-service is undocumented.
- `npv-search-service`: property search/indexing and search tracking backed by Elasticsearch.
- `npv-management-service`: subscription and Paystack transaction operations.
- `npv-notification-service`: email notification API/service.

Likely web journey: user registration/login and profile → property submission and file upload → property/document verification and status → approved-property search → subscription/payment and notification. This is an inferred code path, not verified behavior.

## Persistence, integrations, and contracts
Source/POM declarations indicate MySQL/JPA in user, document, and management; Flyway migrations in auth and user; Elasticsearch in search; Kafka dependency in user; Paystack in management; email in notification; and synchronous HTTP clients between document/user/notification. Frontend contains Google Maps integration dependency. No OpenAPI contract set, service topology, broker configuration, deployment manifests, or integration tests were established in this review.

## Key architecture questions
Confirm canonical auth service and JWT claims/issuer/audience; service discovery and gateway routes; owner identity propagation; file storage/CDN boundary; search indexing and freshness; Kafka usage and topics; and authoritative API schemas/versioning. Java targets are mixed (17 and 21), so supported deployment runtimes need documentation.
