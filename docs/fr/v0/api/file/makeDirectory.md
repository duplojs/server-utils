---
outline: [2, 3]
prev:
  text: "readDirectory"
  link: "/fr/v0/api/file/readDirectory/"
next:
  text: "ensureDirectory"
  link: "/fr/v0/api/file/ensureDirectory/"
description: "Crée un dossier."
---

# makeDirectory

Crée un dossier.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/makeDirectory/main.ts-->
```

## Syntaxe

```typescript
function makeDirectory(
  path: string | URL,
  params?: {
    recursive?: boolean
  }
): Promise<FileSystemLeft | E.Ok>
```

## Paramètres

- `path` : chemin du dossier a créer.
- `params.recursive` : crée aussi les dossiers parents si `true`.

## Valeur de retour

- `E.Ok` : si la création réussit.
- `FileSystemLeft` : si la création échoue.

## Voir aussi

- [`ensureDirectory`](/fr/v0/api/file/ensureDirectory) - S'assure qu'un dossier existe.
