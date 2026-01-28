---
outline: [2, 3]
prev:
  text: "appendTextFile"
  link: "/fr/v0/api/file/appendTextFile/"
next:
  text: "writeJsonFile"
  link: "/fr/v0/api/file/writeJsonFile/"
description: "Lit et parse un fichier JSON."
---

# readJsonFile

Lit et parse un fichier JSON.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/readJsonFile/main.ts-->
```

## Syntaxe

```typescript
function readJsonFile<GenericOutput>(
  path: string | URL
): Promise<FileSystemLeft | E.Success<GenericOutput>>
```

## Paramètres

- `path` : chemin du fichier JSON.

## Valeur de retour

- `E.Success<GenericOutput>` : contenu JSON parse.
- `FileSystemLeft` : si la lecture ou le parse échoue.

## Voir aussi

- [`writeJsonFile`](/fr/v0/api/file/writeJsonFile) - Écrit un objet JSON.
