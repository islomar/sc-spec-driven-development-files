<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Roadmap](#roadmap)
  - [Phase 1: Hello clinic](#phase-1-hello-clinic)
  - [Phase 2: Navigation and agents](#phase-2-navigation-and-agents)
  - [Phase 3: Ailment list and detail](#phase-3-ailment-list-and-detail)
  - [Phase 4: Persistent storage](#phase-4-persistent-storage)
  - [Phase 5: Therapy list and detail](#phase-5-therapy-list-and-detail)
  - [Phase 6: Booking form](#phase-6-booking-form)
  - [Phase 7: Booking confirmation](#phase-7-booking-confirmation)
  - [Phase 8: Prevent double booking](#phase-8-prevent-double-booking)
  - [Phase 9: Staff dashboard](#phase-9-staff-dashboard)
  - [Phase 10: Dashboard counts](#phase-10-dashboard-counts)
  - [Phase 11: Home page polish](#phase-11-home-page-polish)
  - [Phase 12: Accessibility pass and responsive audit](#phase-12-accessibility-pass-and-responsive-audit)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Roadmap

Each phase ships one visible, runnable change. Finish and test a phase before starting the next.
Every phase ships responsive pages that follow the rules in `specs/tech-stack.md`.
Every phase adds Vitest tests for its own routes.

## Phase 1: Hello clinic

Status: complete.

Install Hono and `tsx`. Serve a home page at `/` that says "AgentClinic", with a shared layout (header, main, footer) and a linked stylesheet. Add `npm run dev`.
Add Vitest tests for `/` and `/styles.css` that use `app.request()`. Add `npm test`.

## Phase 2: Navigation and agents

Add navigation to the shared layout. Extend the stylesheet with design tokens, light mode, and dark mode.
At 320px the navigation wraps onto more lines without JavaScript.

Add seed data for agents. Show all agents at `/agents`.

Show one agent at `/agents/:id`: name, model, and the human who caused the trouble. Return a styled 404 for unknown ids.

## Phase 3: Ailment list and detail

Add seed data for ailments. Show `/ailments` and `/ailments/:id`. Link each agent to its ailments.

## Phase 4: Persistent storage

Add SQLite with `better-sqlite3`, the first migration, and a seed script. Move the repository module from seed data to SQLite. Existing pages and tests keep working unchanged.

## Phase 5: Therapy list and detail

Add therapies. Show `/therapies` and `/therapies/:id`. Each ailment page lists the therapies that treat it.

## Phase 6: Booking form

Add a form at `/appointments/new` to pick an agent, an ailment, a therapy, and a time slot. Validate input on the server and show errors next to each field.
On narrow screens the fields stack and fill the width.

## Phase 7: Booking confirmation

Save the appointment. Redirect to `/appointments/:id` with a confirmation page.

## Phase 8: Prevent double booking

Reject a booking when the time slot is taken. Show the next free slot.

## Phase 9: Staff dashboard

Show today's appointments at `/dashboard` with agent, ailment, and therapy.
On narrow screens the appointments table scrolls inside its own container.

## Phase 10: Dashboard counts

Add counts to the dashboard: appointments today, agents by ailment, most booked therapies.
The count cards stack on narrow screens and sit in a row on wide ones.

## Phase 11: Home page polish

Turn the home page into a landing page with the clinic pitch, a featured ailment, and a "Book an appointment" button.

## Phase 12: Accessibility pass and responsive audit

Fix contrast, focus styles, labels, and heading order.
Check every page at 320px, 768px, and 1280px again, and fix any regressions.
