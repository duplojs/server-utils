---
outline: [2, 3]
description: "Retourne le répertoire de travail courant."
prev:
  text: "Common"
  link: "/fr/v0/api/common/"
next:
  text: "getCurrentWorkDirectoryOrThrow"
  link: "/fr/v0/api/common/getCurrentWorkDirectoryOrThrow"
---

# getCurrentWorkDirectory

Retourne le répertoire de travail courant.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/getCurrentWorkDirectory/main.ts-->
```

## Syntaxe

```typescript
function getCurrentWorkDirectory(): E.Error<unknown> | E.Success<string>
```

## Paramètres

Cette fonction ne prend aucun paramètre.

## Valeur de retour

- `E.Success<string>` : le chemin absolu du répertoire courant.
- `E.Error<unknown>` : si la lecture du répertoire courant échoue.

## Voir aussi

- [`getCurrentWorkDirectoryOrThrow`](/fr/v0/api/common/getCurrentWorkDirectoryOrThrow) - Retourne le répertoire courant ou lance une erreur.
- [`setCurrentWorkingDirectory`](/fr/v0/api/common/setCurrentWorkingDirectory) - Change le répertoire de travail courant.
