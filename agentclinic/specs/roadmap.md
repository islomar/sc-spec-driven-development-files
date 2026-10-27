<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Roadmap](#roadmap)
  - [Phase 1: Hello clinic](#phase-1-hello-clinic)
  - [Phase 2: Test harness](#phase-2-test-harness)
  - [Phase 3: Layout and styles](#phase-3-layout-and-styles)
  - [Phase 4: Agent list](#phase-4-agent-list)
  - [Phase 5: Agent detail](#phase-5-agent-detail)
  - [Phase 6: Ailment list and detail](#phase-6-ailment-list-and-detail)
  - [Phase 7: Persistent storage](#phase-7-persistent-storage)
  - [Phase 8: Therapy list and detail](#phase-8-therapy-list-and-detail)
  - [Phase 9: Booking form](#phase-9-booking-form)
  - [Phase 10: Booking confirmation](#phase-10-booking-confirmation)
  - [Phase 11: Prevent double booking](#phase-11-prevent-double-booking)
  - [Phase 12: Staff dashboard](#phase-12-staff-dashboard)
  - [Phase 13: Dashboard counts](#phase-13-dashboard-counts)
  - [Phase 14: Home page polish](#phase-14-home-page-polish)
  - [Phase 15: Responsive and accessibility pass](#phase-15-responsive-and-accessibility-pass)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Roadmap

Each phase ships one visible, runnable change. Finish and test a phase before starting the next.

## Phase 1: Hello clinic

Install Hono and `tsx`. Serve a home page at `/` that says "AgentClinic". Add `npm run dev`.

## Phase 2: Test harness

Add Vitest. Write a test for `/` that uses `app.request()`. Add `npm test`.

## Phase 3: Layout and styles

Add a shared layout with header, navigation, and footer. Add the stylesheet with design tokens, light mode, and dark mode.

## Phase 4: Agent list

Add seed data for agents. Show all agents at `/agents`.

## Phase 5: Agent detail

Show one agent at `/agents/:id`: name, model, and the human who caused the trouble. Return a styled 404 for unknown ids.

## Phase 6: Ailment list and detail

Add seed data for ailments. Show `/ailments` and `/ailments/:id`. Link each agent to its ailments.

## Phase 7: Persistent storage

Choose a storage engine and move the repository module from seed data to it. Existing pages and tests keep working unchanged.

## Phase 8: Therapy list and detail

Add therapies. Show `/therapies` and `/therapies/:id`. Each ailment page lists the therapies that treat it.

## Phase 9: Booking form

Add a form at `/appointments/new` to pick an agent, an ailment, a therapy, and a time slot. Validate input on the server and show errors next to each field.

## Phase 10: Booking confirmation

Save the appointment. Redirect to `/appointments/:id` with a confirmation page.

## Phase 11: Prevent double booking

Reject a booking when the time slot is taken. Show the next free slot.

## Phase 12: Staff dashboard

Show today's appointments at `/dashboard` with agent, ailment, and therapy.

## Phase 13: Dashboard counts

Add counts to the dashboard: appointments today, agents by ailment, most booked therapies.

## Phase 14: Home page polish

Turn the home page into a landing page with the clinic pitch, a featured ailment, and a "Book an appointment" button.

## Phase 15: Responsive and accessibility pass

Check every page at phone width. Fix contrast, focus styles, labels, and heading order.
