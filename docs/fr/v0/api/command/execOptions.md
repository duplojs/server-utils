---
outline: [2, 3]
prev:
  text: "exec"
  link: "/fr/v0/api/command/exec"
next:
  text: "create"
  link: "/fr/v0/api/command/create"
description: "Parse les options CLI depuis les arguments du runtime."
---

# execOptions

`execOptions` parse les options CLI et retourne le résultat sous forme de record `{ [optionName]: resultOption }`.
Si le parsing échoue, une erreur détaillée est affichée dans la console.
Le `--help` / `-h` est généré automatiquement depuis les options déclarées.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/execOptions/main.ts-->
```

## Syntaxe

```typescript
function execOptions<
  GenericOptions extends [Option, ...Option[]]
>(
  ...options: GenericOptions
): ComputeResult<GenericOptions>
```

## Paramètres

- `options` (`[Option, ...Option[]]`) : options à parser depuis les arguments du runtime.

## Valeur de retour

- `ComputeResult<GenericOptions>` : objet dont les clés sont les noms d'options et les valeurs sont les résultats typés de chaque parser.

## Voir aussi

- [`exec`](/fr/v0/api/command/exec) - Lance une commande complète depuis les arguments du runtime.
- [`createBooleanOption`](/fr/v0/api/command/createBooleanOption) - Construit une option drapeau booléenne.
- [`createOption`](/fr/v0/api/command/createOption) - Construit une option à valeur unique.
- [`createArrayOption`](/fr/v0/api/command/createArrayOption) - Construit une option tableau.
