---
outline: [2, 3]
description: "Retourne le répertoire de travail courant."
prev:
  text: "Common"
  link: "/fr/v0/api/common/"
next:
  text: "setCurrentWorkingDirectory"
  link: "/fr/v0/api/common/setCurrentWorkingDirectory"
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
function getCurrentWorkDirectory(): E.Fail | E.Success<string>
```

## Paramètres

Cette fonction ne prend aucun paramètre.

## Valeur de retour

- `E.Success<string>` : le chemin absolu du répertoire courant.
- `E.Fail` : si la lecture du répertoire courant échoue.

## Voir aussi

- [`setCurrentWorkingDirectory`](/fr/v0/api/common/setCurrentWorkingDirectory) - Change le répertoire de travail courant.