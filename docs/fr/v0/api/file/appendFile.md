---
outline: [2, 3]
prev:
  text: "writeTextFile"
  link: "/fr/v0/api/file/writeTextFile/"
next:
  text: "appendTextFile"
  link: "/fr/v0/api/file/appendTextFile/"
description: "Ajoute un contenu binaire a la fin d'un fichier."
---

# appendFile

Ajoute un contenu binaire a la fin d'un fichier.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/appendFile/main.ts-->
```

## Syntaxe

```typescript
function appendFile(
  path: string | URL,
  data: Uint8Array
): Promise<FileSystemLeft | E.Ok>
```

## Paramètres

- `path` : chemin du fichier cible.
- `data` : contenu binaire a ajouter.

## Valeur de retour

- `E.Ok` : si l'opération réussit.
- `FileSystemLeft` : si l'opération échoue.

## Voir aussi

- [`appendTextFile`](/fr/v0/api/file/appendTextFile) - Ajoute un contenu texte.
