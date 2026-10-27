<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Contents

- [Tech Stack](#tech-stack)
  - [Summary](#summary)
  - [Framework choice: Hono](#framework-choice-hono)
  - [Rendering](#rendering)
  - [Styling](#styling)
  - [Data](#data)
  - [Quality rules](#quality-rules)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Tech Stack

## Summary

| Layer | Choice |
|---|---|
| Language | TypeScript, `strict` mode |
| Runtime | Node.js LTS |
| Web framework | Hono |
| Rendering | Server-side HTML with Hono JSX |
| Styling | Plain CSS with custom properties, one stylesheet |
| Client JavaScript | None by default. Add small progressive enhancements only where a feature needs them. |
| Testing | Vitest, using Hono's `app.request()` for route tests |
| Dev runner | `tsx` in watch mode |
| Package manager | npm |

## Framework choice: Hono

Hono is a small, TypeScript-first web framework with a large and growing user base.

Reasons:

- Types flow from routes to handlers without extra setup.
- Built-in JSX renders HTML on the server. No separate template language, no client bundle.
- `app.request()` runs a route in a test without starting a server. Tests stay fast and simple.
- Few dependencies and little framework magic. The code is easy to read in a demo.
- Runs on Node.js today and can move to other runtimes later if needed.

Rejected:

- **Next.js**: popular, but brings a client bundler, React Server Components, and caching rules this app does not need.
- **Express**: familiar, but types are added after the fact and async error handling needs extra work.
- **Fastify**: well typed and fast, but the plugin system adds structure a small app does not need.

## Rendering

Pages render on the server as complete HTML. Forms post to the server and the server redirects. Every page works without JavaScript.

## Styling

One CSS file with design tokens (colors, spacing, type scale) as custom properties. Layouts use CSS grid and flexbox.
Target the current versions of Chrome, Firefox, Safari, and Edge. Support light and dark mode with `prefers-color-scheme`.

## Data

Phase 1 to phase 6 of the roadmap use in-memory seed data behind a repository module. Persistent storage is an open decision. The repository module keeps that decision isolated from routes and views.

## Quality rules

- `tsc --noEmit` passes with no errors.
- Every route has at least one test.
- `npm test` passes before each phase is marked done.
