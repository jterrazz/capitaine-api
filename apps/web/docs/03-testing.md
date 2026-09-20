# Testing

Tests protect actions whose failure would otherwise look successful.

Domain tests cover persisted-data validation and day-specific habit completion.
The `@jterrazz/test` website project exercises production routes, habit progress,
journal persistence across a reload and the honest pairing dialog.

The suffix says which kind a file is. A unit sits beside its module as
`<file>.test.ts`, so `src/domain/workspace.test.ts` covers `src/domain/workspace.ts`.
The assembled product sits under `specs/<facet>/` as `<aspect>.spec.ts`, so the
browser journeys are `specs/website/companion/local-workspace.spec.ts`, beside the
runner `specs/website/website.specification.ts` that serves the production build.

```sh
npm run build
npm test
```

The runner chooses a free port through `PORT`, with isolated browser storage per
journey. It does not share the live preview. Responsive geometry and focus need
manual browser review at desktop and narrow mobile widths. These tests do not
claim that mobile pairing or AI coaching services exist.
