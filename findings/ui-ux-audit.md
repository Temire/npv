# UI/UX audit

## Scope and confidence
Static route/source inventory of `frontend/npv-web` at local monorepo commit `64b3a742541560776fa32c352421b539a68da707`. No browser session, responsive inspection, or accessibility test was performed.

## Page and journey surfaces
The source tree includes landing, authentication (signup/login/recovery/registration completion), dashboard, asset creation/list/detail/resubmission, data portal, help/support, settings, and error pages. Service clients cover user, property, upload, and subscription. Likely journeys include discovery/search, registration, property/document submission, verification, and account/subscription management; completion is unverified.

## Review items before handover
Inspect route guards and session expiry; responsive layouts; keyboard/focus and screen-reader semantics; contrast; field-level validation; upload progress/retry/error; loading/empty/error/success states; confirmation around delete/resubmit; and consistency of search/map behavior. Verify each UI call against backend authorization and response contracts. No design changes are proposed without approved product requirements.
