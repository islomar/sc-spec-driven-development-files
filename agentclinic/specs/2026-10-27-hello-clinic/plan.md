<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Phase 1: Hello clinic. Plan](#phase-1-hello-clinic-plan)
  - [1. Configure TypeScript and ESM](#1-configure-typescript-and-esm)
  - [2. Install dependencies](#2-install-dependencies)
  - [3. Serve a hello page](#3-serve-a-hello-page)
  - [4. Add npm scripts](#4-add-npm-scripts)
  - [5. Build the minimal home page](#5-build-the-minimal-home-page)
  - [6. Add the layout and stylesheet](#6-add-the-layout-and-stylesheet)
  - [7. Add Vitest tests](#7-add-vitest-tests)

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

## 6. Add the layout and stylesheet

1. Create `public/styles.css` with base styles for the header, main, and footer. Keep it outside `src/`: `tsc` does not copy CSS to `dist/`, and Node.js cannot `import` a `.css` file.
2. In `src/index.tsx`, import `serveStatic` from `@hono/node-server/serve-static` and serve `/styles.css` from `./public`.
3. Create one file per component in `src/components/`:
   - `header.tsx` exports `Header`: a `<header>` with the site name as plain text.
   - `main.tsx` exports `Main`: a `<main>` that renders its children.
   - `footer.tsx` exports `Footer`: a `<footer>` with one line of text.
   - `layout.tsx` exports `Layout`: the complete HTML document, with `<Header />`, `<Main>`, and `<Footer />` in `<body>`.
     It imports the three subcomponents from `./header.js`, `./main.js`, and `./footer.js`.
4. Move the doctype, `<html>`, and `<head>` from `HomePage` to `Layout`. Add `<link rel="stylesheet" href="/styles.css" />` to `<head>`.
5. In `src/pages/home.tsx`, wrap the page content in `Layout`. The page keeps the only `<h1>`.

Check: `npm run build` passes.
With `npm start`, `curl -s localhost:3000` returns HTML containing `<header`, `<main`, `<footer`, and the stylesheet link, and `curl -sI localhost:3000/styles.css` returns 200 with `content-type: text/css`.

## 7. Add Vitest tests

1. Move the Hono app, the static middleware, and `GET /` from `src/index.tsx` to `src/app.tsx`. Export it as `app`.
2. Reduce `src/index.tsx` to: import `app` from `./app.js`, read `PORT`, call `serve`.
3. `npm install -D vitest`.
4. Add the `test` script: `vitest run`.
5. Create `tsconfig.build.json`. It extends `tsconfig.json` and excludes `src/**/*.test.ts` and `src/**/*.test.tsx`. Change the `build` script to `tsc -p tsconfig.build.json`.
6. Create `src/app.test.ts`. Use `app.request()` to cover the home page content checks, the `/styles.css` check, and a 404 for an unknown route from `validation.md`.

Check: `npm test` passes, `npx tsc --noEmit` passes, and `npm run build` creates `dist/` with no test files.
