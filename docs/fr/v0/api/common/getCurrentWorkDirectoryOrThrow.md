---
outline: [2, 3]
prev:
  text: "getCurrentWorkDirectory"
  link: "/fr/v0/api/common/getCurrentWorkDirectory"
next:
  text: "setCurrentWorkingDirectory"
  link: "/fr/v0/api/common/setCurrentWorkingDirectory"
description: "Retourne le répertoire de travail courant ou lance une erreur."
---

# getCurrentWorkDirectoryOrThrow

Retourne le répertoire de travail courant ou lance une erreur.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/getCurrentWorkDirectoryOrThrow/main.ts-->
```

## Syntaxe

```typescript
function getCurrentWorkDirectoryOrThrow(): string
```

## Paramètres

Cette fonction ne prend aucun paramètre.

## Valeur de retour

- `string` : le chemin absolu du répertoire courant.

## Voir aussi

- [`getCurrentWorkDirectory`](/fr/v0/api/common/getCurrentWorkDirectory) - Retourne le répertoire de travail courant.
- [`setCurrentWorkingDirectory`](/fr/v0/api/common/setCurrentWorkingDirectory) - Change le répertoire de travail courant.
