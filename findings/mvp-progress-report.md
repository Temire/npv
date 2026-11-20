# NPV MVP Phase 2 Progress Report

Date: 2026-10-19 (reconciled during continuation)  
Repository: branch `dev`, base commit `64b3a742541560776fa32c352421b539a68da707`. No commit or push was made.

## Confirmed requirements and gaps

- Client-defined valid submission requires a survey plan and a financial record, plus seller, buyer and submitter information and an agent affidavit when an agent submits (`product-docs/user-feedback.md`, lines 42–48). The upload UI previously allowed any second document; the backend did not enforce the minimum document pair.
- Client feedback asks for public survey verification/overlap prompts, privacy boundaries, reports from survey/certificate identifiers, generated certificate output and owner/admin notifications. The existing source contains pieces of these journeys, but no end-to-end runtime behavior was verified.
- Explicit high-priority unresolved gap: property reads include global/direct-ID/caller-supplied-user-ID routes while the audit reports permissive service authorization. The client's access restriction and privacy request is therefore not accepted as complete. A field-level public/private policy and role matrix must precede safe publication of search reports.
- Certificate/report PDFs and the MVP/user-story PDFs are present under `product-docs/`, but this environment has no PDF extraction utility/library. Their detailed page content/layout was not reconciled; the feedback email's transcribed certificate fields were used as the available textual evidence.

## Implemented submission-evidence slice

The current checked-out source at the recorded base commit already contains the implementation below. This continuation verified the files and reran the available build/test commands; it made no source-code changes.

1. The property-document upload step now requires an uploaded survey plan and at least one uploaded purchase receipt, deed of assignment, or contract of sale before advancing.
2. The upload mutation now carries the selected document metadata (including survey coordinates) with the upload request context, removing a timeout-dependent read of React state that could lose the current form values. Re-uploading a document type replaces its existing entry instead of leaving stale data.
3. The document service validates the same minimum evidence set before saving a property, including non-blank file URLs.
4. Added backend unit tests for an accepted pair, missing financial evidence, missing survey plan, and blank document URL.

Files changed for implementation:

- `frontend/npv-web/src/pages/dashboard/assets/create-asset/components/uploadDocuments.tsx`
- `backend/npv-document-service/src/main/java/org/pario/npv/service/PropertyService.java`
- `backend/npv-document-service/src/main/java/org/pario/npv/service/PropertySubmissionRequirements.java`
- `backend/npv-document-service/src/test/java/org/pario/npv/service/PropertySubmissionRequirementsTest.java`

The requirements matrix and sequenced backlog are in `mvp-requirements-matrix.md` and `mvp-implementation-backlog.md` in this directory.

## Verification attempted

- Frontend build: reran `npm run build` in `frontend/npv-web`; it exited 127 because `tsc` is not installed. `node` is available, but frontend dependencies are absent.
- Backend tests: reran `bash ./mvnw test` in `backend/npv-document-service`; it stopped because `JAVA_HOME` is not configured and Java is unavailable. No backend tests ran; the test source remains unexecuted.
- PDF review: `pdftotext` and `mutool` are unavailable, so the product PDFs remain unreconciled.
- Paperclip status recording: `GET /api/agents/me` failed because the configured API at `127.0.0.1:3100` refused the connection. No issue comment or assignment/status update was made.
- No application was started, and no user journey was exercised against a running backend or database.

The repository is still on `dev` at `64b3a742541560776fa32c352421b539a68da707`. `findings/` is untracked pre-existing work and remains uncommitted; no source changes, commit, or push were made during this continuation.

## Decisions and outstanding work

1. Confirm submitter contact fields and the required agent affidavit file/category/conditions.
2. Confirm whether the approved brand is “My Property Vault.”
3. Define visibility defaults and report-visible fields, plus admin/reviewer roles. This is a prerequisite to completing public search/report acceptance.
4. Confirm how survey-plan-number search relates to coordinate-based map verification and review the sample search report.
5. Review sample certificate and product/story PDFs once text extraction is available; confirm barcode/authentication and final certificate fields.
6. Confirm KYC timing, rejected-record retention, payment prices/tax, entitlements and notification event list.

## Next recommended implementation task

Complete the remaining submission journey by resolving and adding submitter contact and agent-affidavit evidence, then execute frontend and backend checks in a Java/Node dependency-enabled environment. Next, agree the publication/role policy and implement owner/admin/public field-level access before enabling the search-report journey.
