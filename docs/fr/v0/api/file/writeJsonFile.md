---
outline: [2, 3]
prev:
  text: "readJsonFile"
  link: "/fr/v0/api/file/readJsonFile/"
next:
  text: "readDirectory"
  link: "/fr/v0/api/file/readDirectory/"
description: "Serialize et écrit du JSON dans un fichier."
---

# writeJsonFile

Serialize et écrit du JSON dans un fichier.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/writeJsonFile/main.ts-->
```

## Syntaxe

```typescript
function writeJsonFile(
  path: string,
  data: unknown,
  params?: {
    space?: number;
  }
): Promise<FileSystemLeft<"write-json-file"> | E.Ok>
```

## Paramètres

- `path` : chemin du fichier JSON.
- `data` : données a serialiser.
- `params.space` : indentation JSON (optionnel).

## Valeur de retour

- `E.Ok` : si l'écriture réussit.
- `FileSystemLeft<"write-json-file">` : si la serialisation ou l'écriture échoue.

## Notes

- Si `JSON.stringify` échoue, la fonction retourne un échec.

## Voir aussi

- [`readJsonFile`](/fr/v0/api/file/readJsonFile) - Lit un fichier JSON.
