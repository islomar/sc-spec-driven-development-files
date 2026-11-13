<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Lesson 04 — Prompts](#lesson-04--prompts)
  - [Prompt 1](#prompt-1)
  - [Prompt 2](#prompt-2)
  - [Prompt 3](#prompt-3)
  - [Prompt 4](#prompt-4)
  - [Prompt 5](#prompt-5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Lesson 04 — Prompts

## Prompt 1

We are writing AgentClinic, a place for AI agents to get relief from their humans. Look in the README.md for input from stakeholders.

## Prompt 2

Let's create a "constitution" in a specs directory:

- `mission.md`
- `tech-stack.md`
- `roadmap.md` for high-level implementation order, in very small phases of work.

Important: You *must* use your AskUserQuestion tool, grouped on these 3, before writing to disk.

## Prompt 3

Use server-side TypeScript and recommend a framework.

## Prompt 4

Add a target audience to the mission:

- Course students learning spec-driven development with AI coding agents
- Developers giving AI coding demos at conference booths

## Prompt 5

In tech stack add that we use SQLite.

## Lesson 05 — Prompts

### Prompt 1

Find the next phase on specs/roadmap.md and make a branch, ask me about the feature spec.
Create:

- A new directory YYYY-MM-DD-feature-name under specs for this feature work
- In there:
- `plan.md` as a series of numbered task groups.
- `requirements.md` for the scope, decisions, context
- `validation.md` for how to know the implementation succeeded and can be merged

Refer to specs/mission.md and specs/tech-stack.md for guidance.

Important: You *must* use your AskUserQuestion tool, grouped on these 3, before writing to disk.

### Prompt 2

Add a task group to the plan to have a minimal AgentClinic home page and update the rest of the feature spec to be in sync.

## Lesson 06 — Prompts

### Prompt 1

Implement the remaining task groups.

## Lesson 07 — Prompts

### Prompt 1

Update `specs/2026-03-30-hello-hono/plan.md` and implementation of a main layout component with a header/main/footer as three subcomponents. Make a CSS file, import it, and link to it.

### Prompt 2

Update the spec to capture that the header, footer, and main components should be in their own files.

### Prompt 3

Mark this specs/roadmap.md phase as complete, commit this work, switch to main, and merge this branch, then delete it.

## Lesson 08 — Prompts

### Prompt 1

Update this tech-stack.md to capture that we want to use Vitest tests for validation and write a script in package.json.
