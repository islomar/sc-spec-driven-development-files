---
name: changelog
description: Create or update CHANGELOG.md in the project root from git history, with one section per date. Run it manually with /changelog before merging a branch.
disable-model-invocation: true
argument-hint: "[--dry-run]"
allowed-tools: Bash(python3 ${CLAUDE_SKILL_DIR}/scripts/changelog.py) Bash(python3 ${CLAUDE_SKILL_DIR}/scripts/changelog.py *)
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Changelog](#changelog)
  - [Steps](#steps)
  - [Format](#format)
  - [What the script includes](#what-the-script-includes)
  - [Why a commit marker instead of dates](#why-a-commit-marker-instead-of-dates)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Changelog

Keep `CHANGELOG.md` in the project root up to date from git history.
The project root is the directory that holds `.claude/`.

## Steps

1. Preview the change:

   ```bash
   python3 ${CLAUDE_SKILL_DIR}/scripts/changelog.py --dry-run
   ```

   If the user passed `--dry-run`, show the preview and stop.

2. Write the file:

   ```bash
   python3 ${CLAUDE_SKILL_DIR}/scripts/changelog.py
   ```

   - With no `CHANGELOG.md`, the script creates it from every commit that touches the project.
   - With a `CHANGELOG.md`, it adds only the commits after the recorded one.
   - If the script exits with an error, show the error to the user and stop. Do not edit the marker yourself.

3. Clean up the new bullets only.
   - Rewrite each new bullet as a short, user-facing change in the imperative mood, such as "Add a responsive layout".
   - Keep one bullet per commit. Do not merge, drop, or reorder bullets.
   - Do not change older sections, the date headings, or the marker comment.

4. Show the user the new section or sections, and remind them to commit `CHANGELOG.md` before merging.
   Do not commit, merge, or push.

## Format

```markdown
# Changelog

<!-- changelog: last-commit 833bfc073a76a29315fe633693130d81f8fb42c2 -->

## 2026-11-14

- Add a responsive layout

## 2026-11-13

- Add Vitest tests for the home page
```

- Date headings are `## YYYY-MM-DD`, newest first, using the commit date.
- Inside a date, bullets are newest first.
- New commits on the newest recorded date go to the top of that date's section.

## What the script includes

- Only commits that touch files in the project root. The changelog leaves out commits elsewhere in a larger repository.
- No merge commits.
- No commits that change only `CHANGELOG.md`.

## Why a commit marker instead of dates

The marker comment holds the last recorded commit, and the script lists `<marker>..HEAD`.
A date filter such as `git log --after=2026-11-13` reads the date as that day at the current time of day.
It skips commits made earlier that day, so a second merge on the same day would lose entries.

If history is rewritten and the recorded commit is no longer an ancestor of `HEAD`, the script stops.
The user then sets the marker by hand to the last commit already in the changelog.
