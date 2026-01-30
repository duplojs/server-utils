---
outline: [2, 3]
prev:
  text: "ensureDirectory"
  link: "/fr/v0/api/file/ensureDirectory/"
next:
  text: "symlink"
  link: "/fr/v0/api/file/symlink/"
description: "Parcourt un dossier récursivement."
---

# walkDirectory

Parcourt un dossier récursivement.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/walkDirectory/main.ts-->
```

## Syntaxe

```typescript
function walkDirectory(
  path: string
): Promise<FileSystemLeft<"walk-directory"> | E.Success<Generator<FileInterface | FolderInterface | UnknownInterface>>>
```

## Paramètres

- `path` : chemin du dossier a parcourir.

## Valeur de retour

- `E.Success<Generator<...>>` : generateur d'interfaces fichier, dossier ou inconnu.
- `FileSystemLeft<"walk-directory">` : si la lecture échoue.

## Voir aussi

- [`readDirectory`](/fr/v0/api/file/readDirectory) - Liste les entrées d'un dossier.
