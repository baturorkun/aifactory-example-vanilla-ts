# Manual Handoff

Use this handoff in the manual implementation flow when you want an external implementer to complete the requirement without spending LLM API calls.

## Instruction for Implementer

Read the requirement and constraints below, inspect the target project, implement the change directly in the workspace, and run the configured local checks. Do not call the AI Factory LLM pipeline for this task.

## Target Project

- Root: /Users/batur/Documents/Projects/bytecraft/agentic/testproject1
- Allowed paths: index.html, public, src, tests
- Typecheck: ../aifactory/node_modules/.bin/tsc --noEmit
- Lint: (not configured)
- Test: (not configured)

## Existing Files

- .DS_Store
- .gitignore
- constraints/RQ-0002-ts-hello-form.json
- factory.config.json
- package.json
- public/index.html
- public/index.html.test.ts
- public/index.test.ts
- requirements/RQ-0002-ts-hello-form.md
- src/form.types.ts
- src/form.ui.ts
- src/form.validator.ts
- src/main.ts
- src/styles.css
- src/styles.test.ts
- tsconfig.build.json
- tsconfig.json

## Requirement

# TypeScript Name Greeting

Build a simple browser UI with vanilla TypeScript. The screen must ask for first name and last name. When the user clicks a button, the page must show Hello AD SOYAD using the entered first and last name.

## Acceptance Criteria

- Use plain TypeScript, HTML, and CSS.
- Generate complete file contents for index.html, src/main.ts, and src/styles.css.
- Ask for first name and last name with two labeled inputs.
- Show the greeting only after the button is clicked.
- Render exactly Hello AD SOYAD using trimmed input values separated by one space.
- If either field is empty, show a validation message instead.
- The generated TypeScript must pass the configured typecheck command.


## Constraints

```json
{
  "targetFiles": [
    "public/index.html",
    "src/main.ts",
    "src/styles.css"
  ],
  "stack": "Plain browser TypeScript, HTML, CSS",
  "forbidden": [
    "React",
    "Vue",
    "Angular",
    "Svelte"
  ],
  "notes": [
    "Do not use any framework.",
    "The HTML file may live at public/index.html or index.html. It should load the compiled script from ../dist/main.js or ./dist/main.js depending on its location and load src/styles.css."
  ]
}
```
