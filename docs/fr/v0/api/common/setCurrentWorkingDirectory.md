---
outline: [2, 3]
description: "Change le répertoire de travail courant."
prev:
  text: "getCurrentWorkDirectoryOrThrow"
  link: "/fr/v0/api/common/getCurrentWorkDirectoryOrThrow"
next:
  text: "getProcessArguments"
  link: "/fr/v0/api/common/getProcessArguments"
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
- [`getProcessArguments`](/fr/v0/api/common/getProcessArguments) - Retourne les arguments de ligne de commande.
- [`environmentVariable`](/fr/v0/api/common/environmentVariable) - Charge et valide les variables d'environnement.
