# Repository inventory and audit baseline

## Current workspace reconciliation (2026-10-19)

The current workspace is `D:\Workspaces\paperclip_projects\npv`, on branch `main` at `2a0952f4f64fa4406d450073fc5e2b6872bb3c09`, with `origin` set to `https://github.com/Temire/npv.git`. The cached `origin/main` ref points to the same commit. No fetch was performed, so this does not verify remote freshness. The only difference between this commit and the previously audited `64b3a742541560776fa32c352421b539a68da707` is removal of Windows `Zone.Identifier` metadata for two sample PDFs; no tracked application source, build, or configuration files differ. The audit findings therefore remain applicable to the application source in this checkout. `findings/` is untracked; no application files or Git history were changed.

Refreshed 2026-10-18 from the supplied local checkout at `/home/temire/projects/npv`. No fetch or branch change was performed, per the current instruction. The audited source snapshot is `64b3a742541560776fa32c352421b539a68da707`, branch `dev`, configured upstream `origin/dev`, remote `https://github.com/Temire/npv.git`. `git status --short --branch` reported `## dev...origin/dev` with no working-tree changes. The cached upstream ref matches HEAD, but its freshness was not checked against GitHub.

| Scope | Location | Git status / SHA | Purpose and stack | Audit status |
|---|---|---|---|---|
| Monorepo | `/home/temire/projects/npv` | clean `dev`; `64b3a742541560776fa32c352421b539a68da707`; upstream `origin/dev` | Java Spring Boot services and React/TypeScript/Vite client | Static local-snapshot audit; remote freshness not verified |
| API gateway | `backend/api-gateway` | same monorepo commit | Spring Cloud Gateway, Java 17 | reviewed statically |
| CDN service | `backend/cdn-service` | same monorepo commit | Spring Boot, Java 21; POM artifact `cdn-service` | reviewed statically; distinct from `npv-file-service` in this monorepo |
| Authentication | `backend/npv-auth-service` | same monorepo commit | Spring Boot, Java 21; JDBC, auth/token APIs | reviewed statically |
| Authorization server | `backend/npv-authorization-server` | same monorepo commit | Spring Boot, Java 21; security and JWT | reviewed statically; relationship to auth service unclear |
| User | `backend/npv-user-service` | same monorepo commit | Spring Boot, Java 17; JPA/MySQL/Flyway and Kafka dependencies | reviewed statically |
| Document/property | `backend/npv-document-service` | same monorepo commit | Spring Boot, Java 17; JPA/MySQL | reviewed statically |
| File | `backend/npv-file-service` | same monorepo commit | Spring Boot, Java 21; upload/storage | reviewed statically |
| Management/subscription | `backend/npv-management-service` | same monorepo commit | Spring Boot, Java 17; JPA and Paystack client | reviewed statically |
| Notification | `backend/npv-notification-service` | same monorepo commit | Spring Boot, Java 17; mail | reviewed statically |
| Search | `backend/npv-search-service` | same monorepo commit | Spring Boot, Java 17; Elasticsearch | reviewed statically |
| Web client | `frontend/npv-web` | same monorepo commit | React 18, TypeScript, Vite | reviewed statically |

This is one application Git repository, not 11 independent repositories. A Paperclip support checkout exists under `.paperclip-repositories/`; it is not counted as an application component. Product specifications and client feedback are in `product-docs/`. No application files were modified. No credentials or environment-file values were inspected. No build or test was run in this refresh.
