---
outline: [2, 3]
prev:
  text: "realPath"
  link: "/fr/v0/api/file/realPath/"
next:
  text: "copy"
  link: "/fr/v0/api/file/copy/"
description: "Supprime un fichier ou un dossier."
---

# remove

Supprime un fichier ou un dossier.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/remove/main.ts-->
```

## Syntaxe

```typescript
function remove(
  path: string,
  params?: {
    recursive?: boolean
  }
): Promise<FileSystemLeft<"remove"> | E.Ok>
```

## Paramètres

- `path` : chemin a supprimer.
- `params.recursive` : supprime un dossier non vide si `true`.

## Valeur de retour

- `E.Ok` : si la suppression réussit.
- `FileSystemLeft<"remove">` : si la suppression échoue.

## Voir aussi

- [`copy`](/fr/v0/api/file/copy) - Copie un fichier ou un dossier.
