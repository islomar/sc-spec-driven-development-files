<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Phase 1: Hello clinic. Validation](#phase-1-hello-clinic-validation)
  - [Static checks](#static-checks)
  - [Dev server](#dev-server)
  - [Home page content](#home-page-content)
  - [Production server](#production-server)
  - [Browser](#browser)
  - [Scope](#scope)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Phase 1: Hello clinic. Validation

Phase 1 can merge when every check below passes. Automated tests start in phase 2.

## Static checks

1. `npx tsc --noEmit` exits with code 0.
2. `npm run build` exits with code 0 and creates `dist/index.js`.

## Dev server

1. `npm run dev` starts and logs `http://localhost:3000`.
2. `curl -s -o /dev/null -w '%{http_code}' localhost:3000` prints `200`.
3. Change the tagline in `src/pages/home.tsx`. The server reloads, and `curl` shows the new text. Revert the change.

## Home page content

`curl -s localhost:3000` returns HTML that contains:

1. `<html lang="en">`, a UTF-8 charset meta tag, a viewport meta tag, and a meta description.
2. `<title>AgentClinic</title>` and `<h1>AgentClinic</h1>`.
3. The tagline "Relief for AI agents from their humans."
4. A paragraph that mentions diagnosing an ailment, recommending a therapy, and booking an appointment.
5. A list with three items: context overload, contradictory instructions, and "just one more change".
6. No `<script>` tags and no links.

## Production server

1. `npm start` serves the same page from `dist/`.
2. `PORT=4000 npm start` serves the page on port 4000.

## Browser

1. Open `http://localhost:3000` in a current browser. The page shows "AgentClinic" as a heading and in the tab title.
2. The tagline, paragraph, and ailment list are visible and readable without CSS.
3. At phone width (375px), the text wraps and the page has no horizontal scroll.
4. The browser console shows no errors.

## Scope

1. `package.json` dependencies are exactly `hono` and `@hono/node-server`.
2. Dev dependencies are exactly `typescript`, `tsx`, and `@types/node`.
3. `git status` shows no `dist/` or `node_modules/` files.
4. No routes exist besides `GET /`.
5. `src/index.tsx` holds app setup and routes only. Page markup lives in `src/pages/home.tsx`.
