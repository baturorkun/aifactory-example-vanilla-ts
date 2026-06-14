# AI Factory Vanilla TypeScript Example

This repository is an example target project for [baturorkun/aifactory](https://github.com/baturorkun/aifactory).

It demonstrates how a separate application repo can be driven by AI Factory using requirement files, constraint files, handoff packages, and optional LLM API runs.

## What This Example Builds

This is a plain browser TypeScript app using only:

```text
HTML
CSS
TypeScript
localStorage
```

Current example behavior:

- asks for first name and last name,
- shows `Hello FIRST LAST` after button click,
- validates empty fields,
- saves submitted names in browser `localStorage`,
- lists saved names in a table below the form.

No React, Vue, Angular, Svelte, backend server, or database is used.

## Required Sibling Repo

This project depends on the AI Factory core repo being available as a sibling directory:

```text
agentic/
  aifactory/                         # https://github.com/baturorkun/aifactory
  aifactory-example-ts-greeting/      # this repo
```

The local scripts expect this path:

```text
../aifactory
```

If your folder structure is different, update these files:

```text
package.json
factory.config.json
```

## How This Project Was Created

This repository was originally created as an AI Factory target project using the Vanilla TypeScript template.

From the sibling `aifactory` repo:

```bash
cd agentic/aifactory
pnpm factory new aifactory-example-ts-greeting --template vanilla-ts
cd ../aifactory-example-ts-greeting
```

That command created the initial target-project structure:

```text
requirements/
constraints/
handoffs/
runs/
templates/
public/index.html
src/main.ts
src/styles.css
factory.config.json
package.json
tsconfig.json
tsconfig.build.json
```

After that, the example app was described and extended with:

```text
requirements/RQ-0002-ts-hello-form.md
constraints/RQ-0002-ts-hello-form.json
requirements/RQ-0003-name-history.md
constraints/RQ-0003-name-history.json
```

RQ-0002 adds the first name / last name greeting form. RQ-0003 extends it with saved name history and a table rendered below the form.

## Setup

Clone both repositories into the same parent directory:

```bash
mkdir agentic
cd agentic

git clone https://github.com/baturorkun/aifactory.git
git clone <this-repo-url> aifactory-example-ts-greeting
```

Install AI Factory dependencies:

```bash
cd aifactory
pnpm install
pnpm -r run typecheck
```

Then move into this target project:

```bash
cd ../aifactory-example-ts-greeting
```

## Local App Commands

Run TypeScript typecheck:

```bash
pnpm typecheck
```

Build JavaScript into `dist/`:

```bash
pnpm build
```

Open the app:

```text
public/index.html
```

The HTML file loads:

```text
../src/styles.css
../dist/main.js
```

So run `pnpm build` before opening the page.

## AI Factory Files

This repo contains AI Factory target-project files:

```text
requirements/
constraints/
handoffs/
runs/
factory.config.json
```

### Requirements

```text
requirements/RQ-0002-ts-hello-form.md
requirements/RQ-0003-name-history.md
```

### Constraints

```text
constraints/RQ-0002-ts-hello-form.json
constraints/RQ-0003-name-history.json
```

The requirement ID is the filename without extension.

Example:

```text
RQ-0003-name-history
```

## Handoff Mode: No API Cost

Use handoff mode when you do not want to spend API calls.

```bash
pnpm factory handoff RQ-0003-name-history
```

This creates:

```text
handoffs/RQ-0003-name-history/handoff.md
```

Handoff mode does not call an LLM API and does not modify app code by itself. It only creates an implementation brief containing:

- requirement markdown,
- constraints JSON,
- target project root,
- allowed paths,
- configured local check commands,
- current file list.

You can then give that handoff file to a human or local assistant for implementation.

## Mock Pipeline Mode: No API Cost

If `.env` is not configured, or if you explicitly use `--dry-run`, AI Factory can run with mock behavior.

```bash
pnpm factory run RQ-0003-name-history --dry-run
```

Mock mode is for checking the pipeline and config. It does not implement the real feature.

## API Pipeline Mode

To let AI Factory call a real model provider, create a local `.env` file.

Start from the example:

```bash
cp .env.example .env
```

Then edit `.env` and add your real key.

Gemini example:

```bash
AI_PROVIDER=gemini
AI_MODEL=gemini-2.5-flash
AI_REVIEWER_MODEL=gemini-2.5-flash
AI_BASE_URL=https://generativelanguage.googleapis.com/v1beta
AI_API_KEY=replace_me
```

Run full pipeline:

```bash
pnpm factory run RQ-0003-name-history
```

Run lower-cost fast mode:

```bash
pnpm factory run RQ-0003-name-history --fast
```

Fast mode skips some review agents and uses fewer LLM calls.

## Useful Factory Commands

List recent runs:

```bash
pnpm factory status
```

Show a specific run:

```bash
pnpm factory status <run-id>
```

Show logs:

```bash
pnpm factory logs <run-id>
```

List artifacts:

```bash
pnpm factory artifacts <run-id>
```

Create handoff:

```bash
pnpm factory handoff <requirement-id>
```

Run pipeline:

```bash
pnpm factory run <requirement-id>
```

## Project Structure

```text
public/
  index.html
src/
  main.ts
  styles.css
requirements/
constraints/
handoffs/
runs/
factory.config.json
package.json
tsconfig.json
tsconfig.build.json
```

## Security Notes

Do not commit `.env`.

This repo ignores:

```text
.env
runs/
dist/
node_modules/
```

Commit `.env.example` only.

## Dependency Note

This repo intentionally does not vendor AI Factory. It is a separate target project that points to the sibling core repo:

```text
../aifactory
```

Core project:

[baturorkun/aifactory](https://github.com/baturorkun/aifactory)
