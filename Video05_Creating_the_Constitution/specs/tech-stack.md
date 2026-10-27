<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Tech Stack](#tech-stack)
  - [Summary](#summary)
  - [Framework decision: Hono](#framework-decision-hono)
  - [Project conventions](#project-conventions)
  - [Browser support](#browser-support)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Tech Stack

## Summary

| Layer | Choice |
|---|---|
| Language | TypeScript, `strict` mode |
| Runtime | Node.js (current LTS) |
| Web framework | Hono |
| Views | Hono JSX, rendered on the server |
| Client interactivity | Plain HTML forms. Small progressive-enhancement scripts only where needed. |
| Styling | Plain CSS with custom properties. No CSS framework. |
| Storage | To be decided |
| Tests | Vitest. Route tests through Hono's `app.request()`. |
| Lint and format | ESLint and Prettier |
| Package manager | npm |

## Framework decision: Hono

Hono is a small web framework written in TypeScript. It runs on Node.js through `@hono/node-server`.

Reasons:

- Types are built in. Route params, request bodies and responses are typed without extra packages.
- JSX views render on the server with no React dependency and no build step for the client.
- Routes are testable in-process with `app.request()`. No running server is needed in tests.
- The API is small. A route file reads like plain TypeScript.

Rejected alternatives:

- **Express.** Most popular, but types are bolted on and async error handling needs extra work.
- **Fastify.** Fast and well-typed, but more plugin ceremony than this site needs.
- **Next.js.** Full-stack React. More moving parts, client bundles and framework churn than a server-rendered site needs.

## Project conventions

- Source in `src/`. Build output in `dist/`.
- One route module per feature: `src/routes/agents.tsx`, `src/routes/ailments.tsx`, and so on.
- Tests sit next to the code: `agents.test.ts` beside `agents.tsx`.
- ES modules (`"type": "module"`). The current `tsconfig.json` targets CommonJS and ES2016. Phase 1 updates it.

## Browser support

The current and previous major versions of Chrome, Edge, Firefox and Safari. No Internet Explorer.
