# Prioritized completion plan

| Priority | Task / impact | Evidence | Approach and acceptance | Client decision? |
|---|---|---|---|---|
| P0 | Close access-control exposure | Permit-all gateway/service rules; user-ID/property-ID endpoints | Define perimeter and service authorization; bind record access to authenticated principal; add negative cross-user and admin-role tests; pass route-by-route review | Yes: role matrix and public data policy |
| P1 | Reproduce client security reports | `product-docs/user-feedback.md`; code-level risks above | Controlled test environment; reproduce subscriber isolation/admin access behavior and document fixes with regression coverage | No for reproducing; yes for expected access policy |
| P1 | Resolve identity architecture | Two auth services and user-service login/admin endpoints | Map issuer, token claims, consumers, migration/retirement ownership; document one authoritative flow and test compatibility | Yes: intended identity and admin roles |
| P1 | Validate property and document lifecycle | Web asset flows and document/file APIs | Trace create/upload/review/resubmit/delete/certificate paths; verify transaction and ownership rules with acceptance cases | Yes: approval, visibility, retention rules |
| P1 | Verify payment and notifications | management/Paystack and notification service | Confirm callback security/idempotency, reconciliation, retries, user-facing states | Yes: subscription/payment terms and notification expectations |
| P2 | Establish reproducible build/test baseline | Maven wrappers; frontend build/lint scripts; 4 backend test sources | Pin supported Java/Node versions; run builds/tests on isolated snapshot; add critical-path tests after approval | No |
| P2 | Prepare operations handover | no deployment/CI manifests found in scanned paths | Document topology, config names/secret sources, deploy/rollback, health, logs, backups and ownership; rehearse in staging | Yes: hosting/support ownership |
| P3 | Improve UX/accessibility | React/Vite route/page implementation | Review responsive behavior, keyboard access, validation, upload/load/error states against approved user journeys | Yes: design priorities |
