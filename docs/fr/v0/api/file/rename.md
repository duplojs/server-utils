---
outline: [2, 3]
prev:
  text: "move"
  link: "/fr/v0/api/file/move/"
next:
  text: "truncate"
  link: "/fr/v0/api/file/truncate/"
description: "Renomme un fichier ou dossier dans son dossier parent."
---

# rename

Renomme un fichier ou dossier dans son dossier parent.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/rename/main.ts-->
```

## Syntaxe

```typescript
function rename(
  path: string | URL,
  newName: string
): Promise<FileSystemLeft | E.Ok>
```

## Paramètres

- `path` : chemin a renommer.
- `newName` : nouveau nom (sans chemin).

## Valeur de retour

- `E.Ok` : si le renommage réussit.
- `FileSystemLeft` : si le renommage échoue.

## Voir aussi

- [`move`](/fr/v0/api/file/move) - Déplace un fichier ou un dossier.
