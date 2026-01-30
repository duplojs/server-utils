---
outline: [2, 3]
prev:
  text: "writeFile"
  link: "/fr/v0/api/file/writeFile/"
next:
  text: "appendFile"
  link: "/fr/v0/api/file/appendFile/"
description: "Écrit un contenu texte dans un fichier."
---

# writeTextFile

Écrit un contenu texte dans un fichier.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/writeTextFile/main.ts-->
```

## Syntaxe

```typescript
function writeTextFile(
  path: string,
  data: string
): Promise<FileSystemLeft<"write-text-file"> | E.Ok>
```

## Paramètres

- `path` : chemin du fichier cible.
- `data` : contenu texte a écrire.

## Valeur de retour

- `E.Ok` : si l'écriture réussit.
- `FileSystemLeft<"write-text-file">` : si l'écriture échoue.

## Voir aussi

- [`writeFile`](/fr/v0/api/file/writeFile) - Écrit un contenu binaire.
