---
outline: [2, 3]
prev:
  text: "relocate"
  link: "/fr/v0/api/file/relocate/"
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
  path: string,
  newName: string
): Promise<FileSystemLeft<"rename"> | E.Success<string>>
```

## Paramètres

- `path` : chemin a renommer.
- `newName` : nouveau nom (sans chemin).

## Valeur de retour

- `E.Success<string>` : le nouveau chemin lorsque le renommage réussit.
- `FileSystemLeft<"rename">` : si le renommage échoue.

## Voir aussi

- [`move`](/fr/v0/api/file/move) - Déplace un fichier ou un dossier.
