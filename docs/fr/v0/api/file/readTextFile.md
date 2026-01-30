---
outline: [2, 3]
prev:
  text: "readFile"
  link: "/fr/v0/api/file/readFile/"
next:
  text: "writeFile"
  link: "/fr/v0/api/file/writeFile/"
description: "Lit un fichier texte et retourne son contenu."
---

# readTextFile

Lit un fichier texte et retourne son contenu.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/readTextFile/main.ts-->
```

## Syntaxe

```typescript
function readTextFile(
  path: string
): Promise<FileSystemLeft<"read-text-file"> | E.Success<string>>
```

## Paramètres

- `path` : chemin du fichier a lire.

## Valeur de retour

- `E.Success<string>` : le contenu du fichier.
- `FileSystemLeft<"read-text-file">` : si la lecture échoue.

## Voir aussi

- [`readFile`](/fr/v0/api/file/readFile) - Lit un fichier binaire.
