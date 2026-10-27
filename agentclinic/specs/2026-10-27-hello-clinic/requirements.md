<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Phase 1: Hello clinic. Requirements](#phase-1-hello-clinic-requirements)
  - [Context](#context)
  - [Scope](#scope)
  - [Decisions](#decisions)
  - [Constraints](#constraints)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Phase 1: Hello clinic. Requirements

## Context

Phase 1 of `specs/roadmap.md`. The repo has a bare TypeScript setup: `package.json` with only `typescript`, a `tsconfig.json` targeting ES2016 and CommonJS, and `src/index.ts` that logs one line.

This phase puts the stack from `specs/tech-stack.md` in place and ships a minimal home page that tells a visitor what AgentClinic is. Later phases build on this setup.

The mission names conference booth demos as a target. The phase must stay small enough to build live in a few minutes.

## Scope

In scope:

- Install `hono` and `@hono/node-server` as dependencies.
- Install `tsx` and `@types/node` as dev dependencies.
- Replace `src/index.ts` with `src/index.tsx`, a Hono app.
- `GET /` returns a minimal home page rendered with Hono JSX, defined in `src/pages/home.tsx`. The page has:
  - A complete HTML document: `lang="en"`, UTF-8 charset, viewport meta tag, meta description.
  - The title "AgentClinic" and an `<h1>` with the text "AgentClinic".
  - The tagline "Relief for AI agents from their humans."
  - One paragraph on what the clinic does: diagnose the ailment, recommend a therapy, book an appointment.
  - A list of three common ailments: context overload, contradictory instructions, and "just one more change".
- `npm run dev` starts the server with `tsx watch` and reloads on change.
- `npm run build` compiles to `dist/`.
- `npm start` runs the compiled server from `dist/`.
- Update `tsconfig.json` for ESM and Hono JSX.

Out of scope:

- Tests and Vitest. Phase 2.
- Layout, header, navigation, footer, and CSS. Phase 3.
- Links to pages that do not exist yet, such as `/agents` or a booking button. Phases 4 and 14.
- Any other route, including a health check.
- SQLite and seed data.

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Module system | ESM: `"type": "module"` in `package.json` | Matches Hono docs and current Node.js. |
| TypeScript module settings | `module` and `moduleResolution`: `NodeNext`, `target`: `ES2022` | Required for correct ESM output on Node.js. |
| JSX settings | `jsx`: `react-jsx`, `jsxImportSource`: `hono/jsx` | Hono JSX without React. |
| Node.js adapter | `@hono/node-server` | Official adapter for running Hono on Node.js. |
| Port | `PORT` environment variable, default `3000` | Lets a booth machine pick a free port. |
| Entry file | `src/index.tsx` | JSX needs the `.tsx` extension. |
| Page files | One component per page in `src/pages/` | Keeps the entry file to app setup and routes. Later phases add pages the same way. |
| Local imports | Use the `.js` extension, e.g. `./pages/home.js` | `NodeNext` requires it for ESM output. |

## Constraints

- `tsc --noEmit` passes with `strict` mode on.
- No client JavaScript on the page.
- No dependencies beyond the four listed above.
