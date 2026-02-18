---
outline: [2, 3]
description: "Retourne les arguments de processus passés en ligne de commande."
prev:
  text: "setCurrentWorkingDirectory"
  link: "/fr/v0/api/common/setCurrentWorkingDirectory"
next:
  text: "exitProcess"
  link: "/fr/v0/api/common/exitProcess"
---

# getProcessArguments

Retourne les arguments de processus passés en ligne de commande.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/getProcessArguments/main.ts-->
```

## Syntaxe

```typescript
function getProcessArguments(): string[]
```

## Paramètres

Cette fonction ne prend aucun paramètre.

## Valeur de retour

- `string[]` : arguments de ligne de commande après la partie exécutable/script.

## Voir aussi

- [`exitProcess`](/fr/v0/api/common/exitProcess) - Arrête le processus courant avec un code de sortie optionnel.
- [`setCurrentWorkingDirectory`](/fr/v0/api/common/setCurrentWorkingDirectory) - Change le répertoire de travail courant.
