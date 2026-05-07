---
outline: [2, 3]
prev:
  text: "execOptions"
  link: "/fr/v0/api/command/execOptions"
next:
  text: "createArgument"
  link: "/fr/v0/api/command/createArgument"
description: "Crée une commande CLI avec un nom, des options/sujets optionnels et un handler d'exécution."
---

# create

`create` sert à déclarer une commande CLI.
Vous fournissez un nom et une fonction d'exécution, et vous pouvez aussi ajouter des options, des arguments positionnels, ou des sous-commandes.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/create/main.ts-->
```

## Syntaxe

```typescript
function create(
  name: string,
  execute: () => void
): Command

function create<
  GenericOptions extends readonly Option[],
  GenericSubjects extends Subjects
>(
  name: string,
  params: CreateCommandParams<GenericOptions, GenericSubjects>,
  execute: (
    params: CreateCommandExecuteParams<GenericOptions, GenericSubjects>
  ) => MaybePromise<void>
): Command
```

## Paramètres

- `name` (`string`) : nom de la commande pour le matching et le rendu du help.
- `params` (`CreateCommandParams`, optionnel) : configuration de la commande.
- `params.description` (`string`, optionnel) : description affichée dans le help.
- `params.options` (`Option[]`, optionnel) : parseurs d'options.
- `params.subjects` (`Argument[] | Command[]`, optionnel) : soit une liste d'arguments positionnels construits avec [`createArgument`](/fr/v0/api/command/createArgument), soit une liste de sous-commandes.
- `execute` : handler de commande. Reçoit des `options` typées et, quand des arguments positionnels sont déclarés, des `args` typés.

## Valeur de retour

- `Command` : objet de définition de commande destiné à être accroché à un arbre de commandes et exécuté via [`exec`](/fr/v0/api/command/exec).

## Autres exemples

### Avancé

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/create/advanced.ts-->
```

## Voir aussi

- [`exec`](/fr/v0/api/command/exec) - Exécute une commande racine depuis les arguments du process.
- [`createArgument`](/fr/v0/api/command/createArgument) - Construit un argument positionnel utilisé dans `subjects`.
- [`createOption`](/fr/v0/api/command/createOption) - Construit une option à valeur unique.
- [`createArrayOption`](/fr/v0/api/command/createArrayOption) - Construit une option tableau.
