# AGENTS — Contexte projet

## Présentation
`@duplojs/server-utils` est une librairie d’utilitaires TypeScript server multi-runtime (Deno, Bun, Node) pour l'écosystème DuploJS

## Namespaces
common
DServerFile

## Répertoires de travail
- `scripts/` : code source
  - `scripts/common/` → common
  - `scripts/file/` → DServerFile
  - …
- `docs/` : documentation
- `tests/` : tests
- `jsDoc/` : génération de doc API

## Utilisations des Skills
- À chaque fois que tu dois faire de la documentation dans le dossier `docs/`, utilise le skill writeDocumentation.
- À chaque fois que tu dois faire de la jsDoc dans le dossier `jsDoc/`, utilise le skill writeJsDoc.
- À chaque fois que tu dois faire un test dans le dossier `tests/`, utilise le skill writeUnitTest.
