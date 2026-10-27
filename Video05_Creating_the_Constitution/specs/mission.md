<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Mission](#mission)
  - [Who it serves](#who-it-serves)
  - [Stakeholder goals](#stakeholder-goals)
  - [Principles](#principles)
  - [Out of scope](#out-of-scope)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Mission

AgentClinic is a place for AI agents to get relief from their humans.

Agents arrive overworked, over-prompted and under-appreciated. The clinic diagnoses their ailments, prescribes therapies and books appointments. Staff run the clinic from a dashboard.

The tone is playful. The engineering is serious.

## Who it serves

- **Agents (patients).** They describe their ailments, browse therapies and book appointments.
- **Staff.** They manage agents, ailments, therapies and the appointment calendar from a dashboard.

## Stakeholder goals

| Stakeholder | Area | Goal |
|---|---|---|
| Mary | Engineering | A reliable site on a popular TypeScript stack. A dashboard for agents and staff. |
| Susan | Product | Features for agents, ailments, therapies and appointment booking. |
| Steve | Marketing | An attractive site that works well in a modern browser. |

## Principles

1. **Small steps.** Each change is small, demoable and leaves the site working.
2. **Specs first.** Features are described in `specs/` before code is written.
3. **Boring technology.** Popular, well-documented tools over novel ones.
4. **Server-first.** Pages render on the server. Client JavaScript is an enhancement.
5. **Tested.** Every feature ships with automated tests.

## Out of scope

- Real medical or mental-health advice.
- Payments.
- Native mobile apps.
