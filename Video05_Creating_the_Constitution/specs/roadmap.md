<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Roadmap](#roadmap)
  - [Phase 1: Skeleton](#phase-1-skeleton)
  - [Phase 2: Layout](#phase-2-layout)
  - [Phase 3: Agents list](#phase-3-agents-list)
  - [Phase 4: Agent detail](#phase-4-agent-detail)
  - [Phase 5: Ailments](#phase-5-ailments)
  - [Phase 6: Therapies](#phase-6-therapies)
  - [Phase 7: Book an appointment](#phase-7-book-an-appointment)
  - [Phase 8: Appointments list](#phase-8-appointments-list)
  - [Phase 9: Staff dashboard](#phase-9-staff-dashboard)
  - [Phase 10: Polish](#phase-10-polish)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Roadmap

Each phase is one small, demoable change. The site works at the end of every phase.

## Phase 1: Skeleton

- Install Hono and `@hono/node-server`.
- Switch the project to ES modules and a modern TypeScript target.
- `npm run dev` serves a home page that says "Welcome to AgentClinic".
- One Vitest test checks the home page returns 200.

## Phase 2: Layout

- Shared page layout: header, navigation, footer.
- Base stylesheet with color and spacing tokens.

## Phase 3: Agents list

- Choose the storage layer and record it in `tech-stack.md`.
- `Agent` model: name, model family, intake date.
- `/agents` lists agents from seed data.

## Phase 4: Agent detail

- `/agents/:id` shows one agent.
- Unknown ids return a 404 page.

## Phase 5: Ailments

- `Ailment` model: name, description, severity.
- `/ailments` lists ailments.
- Link agents to their ailments on the agent detail page.

## Phase 6: Therapies

- `Therapy` model: name, description, duration.
- `/therapies` lists therapies.
- Each ailment shows the therapies that treat it.

## Phase 7: Book an appointment

- `Appointment` model: agent, therapy, start time.
- A form on the agent page books an appointment.
- Validation rejects missing fields and past times.

## Phase 8: Appointments list

- `/appointments` lists upcoming appointments by date.
- Cancel an appointment.

## Phase 9: Staff dashboard

- `/dashboard` shows counts of agents, open ailments and today's appointments.
- Links into each list.

## Phase 10: Polish

- Visual design pass for marketing.
- Responsive layout check at phone and desktop widths.
- Accessibility check: labels, contrast, keyboard navigation.
