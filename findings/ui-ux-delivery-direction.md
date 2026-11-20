# NPV UI/UX delivery direction

## Design evidence and status

No approved redesign mockups, screenshots, or design specification were present in the checked repository/task materials at the start of this slice. `findings/ui-ux-audit.md` is a static audit, not an approved design. The frontend already establishes a purple NPV identity, logo assets, the Satoshi font files, Material UI and Tailwind foundations, and reusable form/button components. This is an implementation proposal derived from those existing assets, not a claim of design approval.

## First slice coverage

The frontend routes include a public landing page and guarded signed-in workspace pages for dashboard, property submission, assets, data portal, settings, and support. No admin/reviewer route is present in this frontend. The first redesign slice covers the signed-in workspace shell and property creation journey (property details, required evidence uploads, and photos), because property submission is Priority 1 in the product brief. Landing/discovery, review, payment, certificates, and remaining account journeys remain to be assessed in later slices.

## Proposed visual direction

- Use Satoshi consistently, with dark charcoal text and the existing NPV purple as the primary action color.
- Use a quiet warm-gray canvas, white content surfaces, restrained borders, and moderate rounded corners to clarify hierarchy without replacing the current UI stack.
- Keep the existing sidebar navigation and route/API behavior. Make content widths fluid, retain a persistent desktop navigation rail, and reduce padding and stack upload cards on small screens.
- Present property submission as a clear three-step journey with a page title, current step, grouped form sections, and a concise evidence checklist.
- Use visible keyboard focus, semantic headings/labels, upload affordances operable by keyboard, and live evidence-completion feedback.

## Implemented in this slice

Workspace styling foundations, responsive workspace content width, refreshed submission step header/stepper, clearer property form grouping, responsive document cards, and conditional evidence guidance including the agent affidavit requirement. Existing API mutations and routes are retained. No backend behavior was substituted with mock data.

## Verification still required

Run the frontend build and inspect the rendered submission journey at desktop, tablet, and mobile widths when the frontend dependency tree and browser runtime are available. Keyboard and contrast inspection remains outstanding.
