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
- constraints/RQ-0003-name-history.json
- factory.config.json
- package.json
- public/index.html
- public/index.html.test.ts
- public/index.test.ts
- requirements/RQ-0002-ts-hello-form.md
- requirements/RQ-0003-name-history.md
- src/form.types.ts
- src/form.ui.ts
- src/form.validator.ts
- src/main.ts
- src/styles.css
- src/styles.test.ts
- tsconfig.build.json
- tsconfig.json

## Requirement

# TypeScript Name History

Extend the existing vanilla TypeScript name greeting page. When the user enters first name and last name and clicks the button, the app must keep the submitted name in a local data file and show all previously submitted names in a table below the form.

## Acceptance Criteria

- Use plain TypeScript, HTML, and CSS.
- Do not use React, Vue, Angular, Svelte, or any backend server.
- Keep the existing first name, last name, greeting, and validation behavior working.
- When both fields are valid and the button is clicked, append the trimmed first name and last name to a local data file.
- Show all saved names below the form in a table.
- The table must include at least these columns: first name, last name, full name.
- The list must include names added in previous page sessions when the app is opened again in the same browser.
- If no names have been added yet, show an empty-state message instead of an empty table.
- The generated TypeScript must pass the configured typecheck command.

## Notes

Because this is a static browser TypeScript app without a backend, the local data file may be represented by browser localStorage or an equivalent local browser persistence layer. The implementation should keep persistence code isolated enough that it can later be replaced by a real file or API-backed store.


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
    "Svelte",
    "Backend server",
    "Database"
  ],
  "persistence": {
    "preferred": "localStorage",
    "reason": "The current demo project is a static browser app and cannot write directly to a filesystem data file without a backend or browser file permission flow."
  },
  "notes": [
    "Extend the existing app instead of replacing it with a framework.",
    "Keep the data access logic isolated so a real file/API adapter can be added later.",
    "The visible table should render saved entries after page load and after each successful submission."
  ]
}
```
