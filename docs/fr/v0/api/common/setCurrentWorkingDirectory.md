---
outline: [2, 3]
description: "Change le répertoire de travail courant."
prev:
  text: "getCurrentWorkDirectory"
  link: "/fr/v0/api/common/getCurrentWorkDirectory"
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
  path: string | URL
): E.Fail | E.Ok
```

## Paramètres

- `path` (`string | URL`) : chemin cible. Si une `URL` est fournie, elle est décodée en chemin de fichier.

## Valeur de retour

- `E.Ok` : si le changement de répertoire a réussi.
- `E.Fail` : si le changement de répertoire a échoué.

## Voir aussi

- [`getCurrentWorkDirectory`](/fr/v0/api/common/getCurrentWorkDirectory) - Retourne le répertoire de travail courant.
