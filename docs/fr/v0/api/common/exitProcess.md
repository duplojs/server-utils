---
outline: [2, 3]
description: "Arrête le processus courant avec un code de sortie optionnel."
prev:
  text: "getProcessArguments"
  link: "/fr/v0/api/common/getProcessArguments"
next:
  text: "Common"
  link: "/fr/v0/api/common/"
---

# exitProcess

Arrête le processus courant avec un code de sortie optionnel.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/exitProcess/main.ts-->
```

## Syntaxe

```typescript
function exitProcess(code?: number): void
```

## Paramètres

- `code` (`number`, optionnel) : code de sortie.

## Valeur de retour

- `void` : cette fonction termine le processus courant.

## Voir aussi

- [`getProcessArguments`](/fr/v0/api/common/getProcessArguments) - Retourne les arguments de ligne de commande.
- [`environmentVariable`](/fr/v0/api/common/environmentVariable) - Charge et valide les variables d'environnement.
