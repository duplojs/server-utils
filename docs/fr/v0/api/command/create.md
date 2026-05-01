---
outline: [2, 3]
prev:
  text: "execOptions"
  link: "/fr/v0/api/command/execOptions"
next:
  text: "createBooleanOption"
  link: "/fr/v0/api/command/createBooleanOption"
description: "Crée une commande CLI avec un nom, des options/sujets optionnels et un handler d'exécution."
---

# create

`create` sert à déclarer une commande CLI.
Vous fournissez un nom et une fonction d'exécution, et vous pouvez aussi ajouter des options, un sujet pour les arguments positionnels, ou des sous-commandes.

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
  GenericSubject extends Subject
>(
  name: string,
  params: CreateCommandParams<GenericOptions, GenericSubject>,
  execute: (
    params: CreateCommandExecuteParams<GenericOptions, GenericSubject>
  ) => MaybePromise<void>
): Command
```

## Paramètres

- `name` (`string`) : nom de la commande pour le matching et le rendu du help.
- `params` (`CreateCommandParams`, optionnel) : configuration de la commande.
- `params.description` (`string`, optionnel) : description affichée dans le help.
- `params.options` (`Option[]`, optionnel) : parseurs d'options.
- `params.subject` (`Subject | Command[]`, optionnel) : contrat de parsing pour les données positionnelles ou liste de sous-commandes.
- `execute` : handler de commande. Reçoit des `options` typées et, si présent, un `subject` typé.

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
- [`createOption`](/fr/v0/api/command/createOption) - Construit une option à valeur unique.
- [`createArrayOption`](/fr/v0/api/command/createArrayOption) - Construit une option tableau.
