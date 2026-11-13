#!/usr/bin/env python3
"""Create or update CHANGELOG.md in the project root from git history.

The project root is the directory that holds `.claude/`, four levels above this
file. Only commits that touch the project root are listed, so a project inside a
larger repository gets its own history.

CHANGELOG.md stores the last recorded commit in a marker comment:

    <!-- changelog: last-commit <full hash> -->

Each run lists commits in `<last-commit>..HEAD`, so commits made later on an
already recorded date are never lost.

Usage: changelog.py [--dry-run]
"""

import re
import subprocess
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[4]
CHANGELOG = PROJECT_ROOT / "CHANGELOG.md"
TITLE = "# Changelog"
MARKER_RE = re.compile(r"^<!-- changelog: last-commit ([0-9a-f]{7,40}) -->$", re.M)
DATE_HEADING_RE = re.compile(r"^## (\d{4}-\d{2}-\d{2})$")


def git(*args):
    result = subprocess.run(
        ["git", *args], cwd=PROJECT_ROOT, capture_output=True, text=True
    )
    if result.returncode != 0:
        sys.exit(f"git {' '.join(args)} failed:\n{result.stderr.strip()}")
    return result.stdout


def marker(commit):
    return f"<!-- changelog: last-commit {commit} -->"


def new_commits(since):
    """Return [(date, subject)] newest first, and the HEAD hash."""
    head = git("rev-parse", "HEAD").strip()
    revision = f"{since}..HEAD" if since else "HEAD"
    log = git(
        "log", "--no-merges", "--date=short", "--format=%cd%x09%s",
        revision, "--", ".", ":(exclude)CHANGELOG.md",
    )
    commits = [tuple(line.split("\t", 1)) for line in log.splitlines() if line]
    return commits, head


def group_by_date(commits):
    """Keep git order (newest first) inside each date and across dates."""
    groups = {}
    for date, subject in commits:
        groups.setdefault(date, []).append(subject)
    return groups


def render_section(date, subjects):
    return [f"## {date}", ""] + [f"- {s}" for s in subjects] + [""]


def create(commits, head):
    lines = [TITLE, "", marker(head), ""]
    for date, subjects in group_by_date(commits).items():
        lines += render_section(date, subjects)
    return "\n".join(lines).rstrip("\n") + "\n"


def update(text, commits, head):
    lines = text.splitlines()
    marker_index = next(i for i, line in enumerate(lines) if MARKER_RE.match(line))
    lines[marker_index] = marker(head)

    first_heading = next(
        (i for i, line in enumerate(lines) if DATE_HEADING_RE.match(line)), None
    )
    groups = group_by_date(commits)

    # New commits on the newest recorded date go to the top of that section.
    if first_heading is not None:
        top_date = DATE_HEADING_RE.match(lines[first_heading]).group(1)
        if top_date in groups:
            subjects = groups.pop(top_date)
            insert_at = first_heading + 2  # after the heading and its blank line
            lines[insert_at:insert_at] = [f"- {s}" for s in subjects]

    new_sections = []
    for date, subjects in groups.items():
        new_sections += render_section(date, subjects)
    insert_at = first_heading if first_heading is not None else len(lines)
    if first_heading is None and lines and lines[-1] != "":
        new_sections.insert(0, "")
    lines[insert_at:insert_at] = new_sections
    return "\n".join(lines).rstrip("\n") + "\n"


def main():
    dry_run = "--dry-run" in sys.argv[1:]

    if CHANGELOG.exists():
        text = CHANGELOG.read_text()
        found = MARKER_RE.search(text)
        if not found:
            sys.exit(
                f"{CHANGELOG} has no '{marker('<hash>')}' line. "
                "Add one with the last recorded commit, then run again."
            )
        since = found.group(1)
        if subprocess.run(
            ["git", "merge-base", "--is-ancestor", since, "HEAD"], cwd=PROJECT_ROOT
        ).returncode != 0:
            sys.exit(
                f"Recorded commit {since} is not an ancestor of HEAD. "
                "History was rewritten or the branch differs. Fix the marker by hand."
            )
        commits, head = new_commits(since)
        if not commits:
            print("CHANGELOG.md is up to date. No new commits.")
            return
        result = update(text, commits, head)
        action = "Added"
    else:
        commits, head = new_commits(None)
        if not commits:
            print("No commits touch this project. Nothing to write.")
            return
        result = create(commits, head)
        action = "Created CHANGELOG.md with"

    dates = len(group_by_date(commits))
    summary = f"{action} {len(commits)} entries across {dates} date(s)."
    if dry_run:
        print(result, end="")
        print(f"\n[dry run] {summary} CHANGELOG.md not written.")
        return
    CHANGELOG.write_text(result)
    print(summary)


if __name__ == "__main__":
    main()
