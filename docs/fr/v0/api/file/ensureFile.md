---
outline: [2, 3]
prev:
  text: "makeTemporaryFile"
  link: "/fr/v0/api/file/makeTemporaryFile/"
next:
  text: "fileInterface"
  link: "/fr/v0/api/file/fileInterface/"
description: "S'assure qu'un fichier existe."
---

# ensureFile

S'assure qu'un fichier existe.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/ensureFile/main.ts-->
```

## Syntaxe

```typescript
function ensureFile(
  path: string
): Promise<FileSystemLeft<"ensure-file"> | E.Ok>
```

## Paramètres

- `path` : chemin du fichier.

## Valeur de retour

- `E.Ok` : si le fichier existe ou a ete crée.
- `FileSystemLeft<"ensure-file">` : si l'opération échoue.

## Voir aussi

- [`ensureDirectory`](/fr/v0/api/file/ensureDirectory) - S'assure qu'un dossier existe.
