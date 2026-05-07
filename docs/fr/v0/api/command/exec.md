---
outline: [2, 3]
prev:
  text: "Command"
  link: "/fr/v0/api/command/"
next:
  text: "execOptions"
  link: "/fr/v0/api/command/execOptions"
description: "Lance une commande CLI à partir des arguments du runtime."
---

# exec

`exec` lance votre CLI.
Il lit les arguments passés au programme, choisit la bonne commande, puis exécute votre callback.
Si l'utilisateur passe `--help`, le help correspondant est affiché automatiquement.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/exec/main.ts-->
```

## Syntaxe

```typescript
function exec(
  execute: () => void
): Promise<void>

function exec<
  GenericOptions extends readonly Option[],
  GenericSubjects extends Subjects
>(
  params: CreateCommandParams<GenericOptions, GenericSubjects>,
  execute: (
    params: CreateCommandExecuteParams<GenericOptions, GenericSubjects>
  ) => MaybePromise<void>
): Promise<void>
```

## Paramètres

- `execute` : handler racine appelé quand aucun objet `params` n'est fourni.
- `params` (`CreateCommandParams`) : configuration de la commande racine.
- `params.description` (`string`, optionnel) : affiché dans le rendu du help.
- `params.options` (`Option[]`, optionnel) : définitions d'options parsées avant exécution.
- `params.subjects` (`Argument[] | Command[]`, optionnel) : liste d'arguments positionnels ou liste de sous-commandes.
- `execute` (surcharge 2) : reçoit `options` typées et `args` typés optionnels.

## Valeur de retour

- `Promise<void>` : résolue une fois le dispatch et l'exécution terminés.

## Autres exemples

### Commande racine minimale

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/exec/otherExample.ts-->
```

### Avancé

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/exec/advanced.ts-->
```

## Voir aussi

- [`create`](/fr/v0/api/command/create) - Construit un noeud de commande.
- [`createArgument`](/fr/v0/api/command/createArgument) - Construit des arguments positionnels utilisés dans `subjects`.
- [`createBooleanOption`](/fr/v0/api/command/createBooleanOption) - Construit une option drapeau booléenne.
- [`createOption`](/fr/v0/api/command/createOption) - Construit une option à valeur unique.
- [`createArrayOption`](/fr/v0/api/command/createArrayOption) - Construit une option tableau.
