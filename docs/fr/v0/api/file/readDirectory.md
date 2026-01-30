---
outline: [2, 3]
prev:
  text: "writeJsonFile"
  link: "/fr/v0/api/file/writeJsonFile/"
next:
  text: "makeDirectory"
  link: "/fr/v0/api/file/makeDirectory/"
description: "Liste les entrées d'un dossier."
---

# readDirectory

Liste les entrées d'un dossier.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/readDirectory/main.ts-->
```

## Syntaxe

```typescript
function readDirectory(
  path: string,
  params?: {
    recursive?: true
  }
): Promise<FileSystemLeft<"read-directory"> | E.Success<string[]>>
```

## Paramètres

- `path` : chemin du dossier a lister.
- `params.recursive` : liste aussi les sous-dossiers si `true`.

## Valeur de retour

- `E.Success<string[]>` : liste des entrées.
- `FileSystemLeft<"read-directory">` : si la lecture échoue.

## Voir aussi

- [`makeDirectory`](/fr/v0/api/file/makeDirectory) - Crée un dossier.
