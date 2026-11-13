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

This phase puts the stack from `specs/tech-stack.md` in place, including Vitest, and ships a minimal home page that tells a visitor what AgentClinic is. Later phases build on this setup.

The mission names conference booth demos as a target. The phase must stay small enough to build live in a few minutes.

## Scope

In scope:

- Install `hono` and `@hono/node-server` as dependencies.
- Install `tsx`, `@types/node`, and `vitest` as dev dependencies.
- Replace `src/index.ts` with two files: `src/app.tsx` builds and exports the Hono app, and `src/index.tsx` starts the server.
- `GET /` returns a minimal home page rendered with Hono JSX, defined in `src/pages/home.tsx`. The page has:
  - A complete HTML document: `lang="en"`, UTF-8 charset, viewport meta tag, meta description.
  - The title "AgentClinic" and an `<h1>` with the text "AgentClinic".
  - The tagline "Relief for AI agents from their humans."
  - One paragraph on what the clinic does: diagnose the ailment, recommend a therapy, book an appointment.
  - A list of three common ailments: context overload, contradictory instructions, and "just one more change".
- A `Layout` component in `src/components/layout.tsx` holds the HTML document and renders three subcomponents: `Header`, `Main`, and `Footer`.
  Each subcomponent lives in its own file: `header.tsx`, `main.tsx`, and `footer.tsx` in `src/components/`.
- A stylesheet at `public/styles.css`, served at `/styles.css` and linked from `Layout`.
- A responsive layout that follows `specs/tech-stack.md`: mobile-first, readable at 320px, 768px, and 1280px, with no horizontal scroll.
- `npm run dev` starts the server with `tsx watch` and reloads on change.
- `npm run build` compiles to `dist/`.
- `npm start` runs the compiled server from `dist/`.
- `npm test` runs Vitest tests for `/`, `/styles.css`, and an unknown route, using `app.request()`.
  The tests cover each check in `validation.md` that needs no running server or browser.
- Update `tsconfig.json` for ESM and Hono JSX.

Out of scope:

- Navigation, design tokens, and dark mode. Phase 2.
- Links to pages that do not exist yet, such as `/agents` or a booking button. Phases 2 and 11.
- Any other route, including a health check. `/styles.css` is the only static file served.
- SQLite and seed data.

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Module system | ESM: `"type": "module"` in `package.json` | Matches Hono docs and current Node.js. |
| TypeScript module settings | `module` and `moduleResolution`: `NodeNext`, `target`: `ES2022` | Required for correct ESM output on Node.js. |
| JSX settings | `jsx`: `react-jsx`, `jsxImportSource`: `hono/jsx` | Hono JSX without React. |
| Node.js adapter | `@hono/node-server` | Official adapter for running Hono on Node.js. |
| Port | `PORT` environment variable, default `3000` | Lets a booth machine pick a free port. |
| Entry file | `src/index.tsx` starts the server | Keeps the entry file to `serve()` and the port. |
| App file | `src/app.tsx` exports the Hono app and its routes | Tests import the app without starting a server. |
| Test files | `*.test.ts` next to the code they test | Matches `specs/tech-stack.md`. |
| Build config | `npm run build` uses `tsconfig.build.json`, which excludes test files | `dist/` holds no tests. `tsc --noEmit` still type-checks them. |
| Page files | One component per page in `src/pages/` | Keeps the app file to setup and routes. Later phases add pages the same way. |
| Component files | One component per file in `src/components/` | Later phases change the header and footer on their own, such as adding navigation in phase 2. |
| Local imports | Use the `.js` extension, e.g. `./pages/home.js` | `NodeNext` requires it for ESM output. |
| Stylesheet location | `public/styles.css`, outside `src/` | `tsc` does not copy CSS to `dist/`. |
| Responsive approach | Mobile-first CSS, one `min-width: 48rem` media query, fluid padding and `h1` size with `clamp()`, one centered content column capped at 65 characters | Rules from `specs/tech-stack.md`. The page has no wide content yet, so one breakpoint is enough. |
| Stylesheet delivery | `serveStatic` from `@hono/node-server/serve-static`, plus a `<link>` tag | Node.js cannot `import` a `.css` file. |

## Constraints

- `tsc --noEmit` passes with `strict` mode on.
- No client JavaScript on the page.
- No horizontal page scroll at any width from 320px up.
- No dependencies beyond the five listed above.
- `npm test` passes.
