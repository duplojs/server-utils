---
outline: [2, 3]
prev:
  text: "appendFile"
  link: "/fr/v0/api/file/appendFile/"
next:
  text: "readJsonFile"
  link: "/fr/v0/api/file/readJsonFile/"
description: "Ajoute un contenu texte a la fin d'un fichier."
---

# appendTextFile

Ajoute un contenu texte a la fin d'un fichier.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/appendTextFile/main.ts-->
```

## Syntaxe

```typescript
function appendTextFile(
  path: string | URL,
  data: string
): Promise<FileSystemLeft | E.Ok>
```

## Paramètres

- `path` : chemin du fichier cible.
- `data` : contenu texte a ajouter.

## Valeur de retour

- `E.Ok` : si l'opération réussit.
- `FileSystemLeft` : si l'opération échoue.

## Voir aussi

- [`appendFile`](/fr/v0/api/file/appendFile) - Ajoute un contenu binaire.
