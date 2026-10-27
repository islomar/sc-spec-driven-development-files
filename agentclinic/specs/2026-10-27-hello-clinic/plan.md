<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Phase 1: Hello clinic. Plan](#phase-1-hello-clinic-plan)
  - [1. Configure TypeScript and ESM](#1-configure-typescript-and-esm)
  - [2. Install dependencies](#2-install-dependencies)
  - [3. Serve a hello page](#3-serve-a-hello-page)
  - [4. Add npm scripts](#4-add-npm-scripts)
  - [5. Build the minimal home page](#5-build-the-minimal-home-page)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Phase 1: Hello clinic. Plan

Each task group ends with a check. Do not start the next group until the check passes.

## 1. Configure TypeScript and ESM

1. In `package.json`, add `"type": "module"`.
2. In `tsconfig.json`, set `target` to `ES2022`, `module` and `moduleResolution` to `NodeNext`.
3. In `tsconfig.json`, set `jsx` to `react-jsx` and `jsxImportSource` to `hono/jsx`.
4. Keep `strict`, `outDir: "dist"`, and `include: ["src"]`.

Check: `npx tsc --noEmit` passes on the existing `src/index.ts`.

## 2. Install dependencies

1. `npm install hono @hono/node-server`.
2. `npm install -D tsx @types/node`.

Check: `npm ls hono @hono/node-server tsx @types/node` lists all four with no errors.

## 3. Serve a hello page

1. Delete `src/index.ts`.
2. Create `src/index.tsx` with a Hono app.
3. Add `GET /` that renders a JSX page with `<title>AgentClinic</title>` and `<h1>AgentClinic</h1>`.
4. Start the server with `serve` from `@hono/node-server` on `PORT` or `3000`. Log the URL on start.

Check: `npx tsx src/index.tsx` starts, and `curl -s localhost:3000` returns HTML containing `<h1>AgentClinic</h1>`.

## 4. Add npm scripts

1. `dev`: `tsx watch src/index.tsx`.
2. `build`: `tsc`.
3. `start`: `node dist/index.js`.
4. Add `dist/` and `node_modules/` to `.gitignore` if missing.

Check: `npm run build` creates `dist/index.js`, and `npm start` serves the hello page.

## 5. Build the minimal home page

1. Create `src/pages/home.tsx` that exports a `HomePage` component.
2. Render a complete HTML document:
   - `<html lang="en">`, `<meta charset="utf-8">`, and a viewport meta tag.
   - `<title>AgentClinic</title>` and a meta description.
3. Inside `<main>`, render:
   - `<h1>AgentClinic</h1>`.
   - The tagline "Relief for AI agents from their humans."
   - One paragraph: the clinic diagnoses the ailment, recommends a therapy, and books an appointment.
   - A list of three common ailments: context overload, contradictory instructions, and "just one more change".
4. In `src/index.tsx`, import `HomePage` from `./pages/home.js` and render it at `GET /`.

Check: every step in `validation.md` passes.
