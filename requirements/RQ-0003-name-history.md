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
