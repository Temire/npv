# Defects and gaps

## Verified code-level risks
- Gateway currently applies `.anyExchange().permitAll()` in `backend/api-gateway/src/main/java/org/pario/npv/config/SecurityConfig.java:26`. File service also has `anyRequest().permitAll()` at `backend/npv-file-service/src/main/java/org/pario/npv/config/SecurityConfig.java:28`; document, management, search and user service security configurations contain the same broad authorization pattern. This is a serious access-control risk; whether a perimeter layer restricts access is unknown.
- Property API exposes owner-scoped lookup using caller-supplied `/user/{userId}` and `/user/approved/{userId}`, direct document/property reads, approval, and delete operations (`backend/npv-document-service/src/main/java/org/pario/npv/api/PropertyApi.java:60-108`). No endpoint method-level authorization is visible there. Confirm service boundary reachability and authorization behavior before production use.
- File upload takes caller-supplied `userId` (`backend/npv-file-service/src/main/java/org/pario/npv/api/FileUploadApi.java:20-25`) while its security chain permits all requests. Ownership binding and upload policy need enforcement.
- User API declares `@CrossOrigin(origins = "*")` at `backend/npv-user-service/src/main/java/org/pario/npv/api/user/UserApi.java:22`; review intended browser origins and credential policy.
- Two authentication projects expose overlapping authentication functionality. Canonical identity and safe retirement/migration path are unclear.
- Java 17/21 targets are mixed. Runtime/build matrix is undocumented.
- No Docker, compose, CI workflow, or Jenkinsfile was found in the scanned repository paths; no deployment or rollback process is established by checked-in manifests.

These are source-level findings, not claims of a reproduced exploit or runtime exposure. Client reports of cross-subscriber data access and an open admin portal are not independently reproduced.

## Unverified delivery gaps
Build health, actual tests, end-to-end property/document workflows, payment callbacks, email delivery, search index freshness, data consistency, deployment, backup/restore, and monitoring remain unverified. Product feedback and PDFs under `product-docs/` must be reconciled into explicit acceptance criteria.
