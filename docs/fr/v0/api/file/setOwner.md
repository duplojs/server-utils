---
outline: [2, 3]
prev:
  text: "setMode"
  link: "/fr/v0/api/file/setMode/"
next:
  text: "setTime"
  link: "/fr/v0/api/file/setTime/"
description: "Definit le propriétaire d'un fichier ou dossier."
---

# setOwner

Definit le propriétaire d'un fichier ou dossier.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/setOwner/main.ts-->
```

## Syntaxe

```typescript
function setOwner(
  path: string,
  params: {
    userId: number;
    groupId: number;
  }
): Promise<FileSystemLeft<"set-owner"> | E.Ok>
```

## Paramètres

- `path` : chemin cible.
- `params.userId` : identifiant utilisateur.
- `params.groupId` : identifiant groupe.

## Valeur de retour

- `E.Ok` : si l'opération réussit.
- `FileSystemLeft<"set-owner">` : si l'opération échoue.

## Voir aussi

- [`setMode`](/fr/v0/api/file/setMode) - Definit les permissions d'un fichier ou dossier.
