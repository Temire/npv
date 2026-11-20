# Security and operational risks

## High priority, verified in source
1. Broad permit-all rules appear in gateway and several services. Gateway `SecurityConfig.java:26` permits every exchange; file service `SecurityConfig.java:28` permits every request. Combined with property/document endpoints accepting record IDs and user IDs, this creates a serious authorization risk requiring urgent controlled review.
2. `PropertyApi.java:60-108` exposes read, approval, and delete handlers without visible method-level access annotations. `FileUploadApi.java:20-25` trusts a request `userId`. Verify JWT principal binding, ownership checks, gateway reachability, and admin-role enforcement across every route.
3. User API has wildcard CORS (`UserApi.java:22`); confirm intended origins and whether credentials are allowed.
4. Two authentication codebases create issuer/token trust ambiguity.

## Reported but not reproduced
`product-docs/user-feedback.md` reports cross-subscriber data visibility and an admin portal opening without password restrictions. These are client reports, not independent reproduction. Treat as urgent pending controlled verification.

## Operational
Mixed Java targets, undocumented service topology, absent deployment/CI manifests in the inspected paths, and unverified monitoring, backups, rollback, secret management, and dependency operations create handover risk. Tracked `.p12` keystores were found; their contents were not opened. Determine ownership and whether any material is live, then rotate if exposure is confirmed. No secret values were inspected.
