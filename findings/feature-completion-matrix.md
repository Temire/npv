# Feature completion matrix

Evidence is static source/UI presence at local commit `64b3a742541560776fa32c352421b539a68da707`; no journeys were executed. Presence does not mean complete.

| Capability | Code evidence | Status and required validation |
|---|---|---|
| Public discovery and property search | `frontend/npv-web/src/pages`; property service search client; search service API | UI/API surfaces present; verify query contract, privacy, geographic behavior, indexing and empty/error states |
| Registration, login, password recovery | web auth pages; both auth services; user service | Implementations present; canonical issuer, token lifecycle, email verification and account completion unclear |
| Profile and account settings | web settings; user API | Surface present; verify validation, access control and persistence |
| Property submission and uploads | web asset flows; document and file APIs | Surface present; verify ownership, upload constraints, retries and partial failures |
| Review, approval and resubmission | document API includes approval/resubmit endpoints; management service exists | Endpoint surface present; verify role checks, state transitions, audit history and notifications |
| Certificates and search reports | document API/model; product docs include sample certificate/report | Verify generation, source data, numbering, authorization and client acceptance |
| Subscription/payment | web subscription service; management API and Paystack client | Backend counterpart exists; verify provider configuration, callbacks/idempotency, reconciliation and failure states |
| Email notifications | notification API/service; document client | Verify templates, triggers, delivery/retry behavior and preferences |
| CDN/media | `cdn-service` and file service are separate components | Relationship and production routing unclear |
| Admin operations | management/user/admin APIs and auth server admin controllers | Verify protected routes, role matrix, auditability, and client-reported portal behavior |

Client decisions remain needed on public/private visibility, search fields, roles, approval rules, certificate/report content, deletion/retention, payment/subscription terms, and notification expectations.
