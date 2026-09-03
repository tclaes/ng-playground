# NgPlayground

A small Angular playground for experimenting with browser AI APIs.

Generated with [Angular CLI](https://github.com/angular/angular-cli) 22.1.7.

## Current feature: AI Summary

`src/features/ai-summary/` is the app's only route (`/`). It renders a form with a
textarea and a Submit button and answers the question you type using Chrome's
built-in **Prompt API** (`LanguageModel`), running the model on-device.

- The form submits via `(ngSubmit)` — there is no `click` handler on the button.
- `expectedInputs` / `expectedOutputs` languages are declared as `en`; Chrome's
  Prompt API throws `NotSupportedError` ("no language specified") without them.
- Availability is checked first; if the model is `unavailable` a message is shown
  instead of prompting.
- A system prompt forces answers in English, and the response is rendered below
  the form.
- The answer is held in a `signal` exposed read-only as `summary()`.

Requires a Chrome build with the Prompt API (`LanguageModel`) available.

## Development server

```bash
ng serve
```

Then open `http://localhost:4200/`.

## Building

```bash
ng build
```

## Running unit tests

Tests run on the [Vitest](https://vitest.dev/) runner:

```bash
ng test
```

`ai-summary.spec.ts` stubs the `LanguageModel` global to verify a question
(e.g. "Who is the pope?") is passed through and its answer rendered.
