---
outline: [2, 3]
description: "Change le répertoire de travail courant."
prev:
  text: "getCurrentWorkDirectoryOrThrow"
  link: "/fr/v0/api/common/getCurrentWorkDirectoryOrThrow"
next:
  text: "Common"
  link: "/fr/v0/api/common/"
---

# setCurrentWorkingDirectory

Change le répertoire de travail courant.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/setCurrentWorkingDirectory/main.ts-->
```

## Syntaxe

```typescript
function setCurrentWorkingDirectory(
  path: string
): E.Fail | E.Ok
```

## Paramètres

- `path` (`string`) : chemin cible.

## Valeur de retour

- `E.Ok` : si le changement de répertoire a réussi.
- `E.Fail` : si le changement de répertoire a échoué.

## Voir aussi

- [`getCurrentWorkDirectory`](/fr/v0/api/common/getCurrentWorkDirectory) - Retourne le répertoire de travail courant.
