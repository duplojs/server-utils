---
outline: [2, 3]
prev:
  text: "File"
  link: "/fr/v0/api/file/"
next:
  text: "readTextFile"
  link: "/fr/v0/api/file/readTextFile/"
description: "Lit un fichier et retourne son contenu binaire."
---

# readFile

Lit un fichier et retourne son contenu binaire.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/readFile/main.ts-->
```

## Syntaxe

```typescript
function readFile(
  path: string
): Promise<FileSystemLeft<"read-file"> | E.Success<Uint8Array>>
```

## Paramètres

- `path` : chemin du fichier a lire.

## Valeur de retour

- `E.Success<Uint8Array>` : le contenu du fichier.
- `FileSystemLeft<"read-file">` : si la lecture échoue.

## Voir aussi

- [`readTextFile`](/fr/v0/api/file/readTextFile) - Lit un fichier texte.
