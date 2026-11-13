<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Contents

- [Tech Stack](#tech-stack)
  - [Summary](#summary)
  - [Framework choice: Hono](#framework-choice-hono)
  - [Rendering](#rendering)
  - [Styling](#styling)
    - [Responsive design](#responsive-design)
  - [Data](#data)
  - [Testing](#testing)
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
| Styling | Plain CSS with custom properties, one stylesheet, responsive and mobile-first |
| Database | SQLite, through `better-sqlite3`. Plain SQL, no ORM. |
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

### Responsive design

Every page works at any width from 320px up.

- Mobile-first. Base styles target 320px. `min-width` media queries in `rem` add layout for wider screens.
- Check widths: 320px (small phone), 768px (tablet), and 1280px (desktop). Check each page at all three.
- No horizontal page scroll at any width from 320px up.
- Reading text stays within 65 characters per line.
- Spacing and type scale with the viewport through `rem` and `clamp()`. No fixed pixel widths on layout containers.
- Links, buttons, and form fields have a touch target of at least 44 by 44 CSS pixels.
- Wide content, such as tables, scrolls inside its own container. The page itself never scrolls sideways.
- Images and media never exceed their container width.
- Responsive behavior is CSS only. Navigation wraps or stacks on narrow screens without JavaScript.
- Every page has `<meta name="viewport" content="width=device-width, initial-scale=1">`.

## Data

AgentClinic stores data in SQLite.

- The database is one file, `data/agentclinic.db`. Git ignores it.
- `better-sqlite3` is the driver. Its calls are synchronous, which keeps the code short.
- Schema changes live in numbered SQL files in `migrations/`. The app applies new ones at startup.
- A seed script loads sample agents, ailments, and therapies.
- Tests use an in-memory database (`:memory:`). Each test starts from a fresh schema.
- Routes and views never write SQL. They call a repository module, and only the repository module talks to the database.

Phase 1 to phase 6 of the roadmap use in-memory seed data behind the repository module. Phase 7 moves the repository module to SQLite.

Rejected:

- **`node:sqlite`**: built into Node.js and needs no extra package, but still experimental on Node.js 22.
- **An ORM such as Drizzle or Prisma**: adds a schema language and code generation. Plain SQL is easier to follow in a demo.
- **PostgreSQL**: needs a running server. SQLite works with no setup on a student laptop or a booth machine.

## Testing

Vitest tests check each feature against its `validation.md`.

- Each check in `validation.md` that does not need a running server or a browser becomes a Vitest test.
  Checks that need one stay manual, such as dev server reload, `npm start`, the responsive checks at each check width, and console errors.
- Route tests call `app.request()` and assert on the status, headers, and HTML.
  They do not start a server.
- `src/app.tsx` builds and exports the Hono app.
  `src/index.tsx` imports it and starts the server.
  Tests import `src/app.tsx`, so they never open a port.
- Test files sit next to the code they test, named `*.test.ts` or `*.test.tsx`.
- `package.json` has a `test` script, `"test": "vitest run"`.
  `npm test` runs every test once and exits.
- `npm run build` uses `tsconfig.build.json`, which excludes test files, so `dist/` holds no tests.
  `tsc --noEmit` uses `tsconfig.json` and type-checks the tests too.

## Quality rules

- `tsc --noEmit` passes with no errors.
- Every route has at least one test.
- `npm test` passes before each phase is marked done.
- Every page passes the responsive checks at 320px, 768px, and 1280px before the phase closes.
