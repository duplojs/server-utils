---
outline: [2, 3]
prev:
  text: "readTextFile"
  link: "/fr/v0/api/file/readTextFile/"
next:
  text: "writeTextFile"
  link: "/fr/v0/api/file/writeTextFile/"
description: "Écrit un contenu binaire dans un fichier."
---

# writeFile

Écrit un contenu binaire dans un fichier.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/writeFile/main.ts-->
```

## Syntaxe

```typescript
function writeFile(
  path: string,
  data: Uint8Array
): Promise<FileSystemLeft<"write-file"> | E.Ok>
```

## Paramètres

- `path` : chemin du fichier cible.
- `data` : contenu binaire a écrire.

## Valeur de retour

- `E.Ok` : si l'écriture réussit.
- `FileSystemLeft<"write-file">` : si l'écriture échoue.

## Voir aussi

- [`writeTextFile`](/fr/v0/api/file/writeTextFile) - Écrit un contenu texte.
