---
outline: [2, 3]
prev:
  text: "Command"
  link: "/fr/v0/api/command/"
next:
  text: "create"
  link: "/fr/v0/api/command/create"
description: "Exécute un arbre de commandes CLI à partir des arguments du process runtime."
---

# exec

Exécute un arbre de commandes CLI à partir des arguments du process runtime.

`exec` est le bloc central de l'API command: il crée la commande implicite `root`, lit les arguments du process, route vers les sous-commandes, parse options/sujet, et déclenche l'affichage du help (`--help`) au bon niveau.

## Exemple détaillé (flux complet)

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/exec/main.ts-->
```

### Ce qui se passe étape par étape

1. `SC.exec(...)` construit une commande `root`.
2. Les arguments runtime sont lus (`process.argv`, `Bun.argv`, ou `Deno.args`).
3. La première sous-commande correspondante est sélectionnée pour les arbres de commandes.
4. `--help` affiche le help du niveau courant (root/commande/sous-commande).
5. Les options sont parsées dans l'ordre de déclaration.
6. Le `subject` (si présent) est parsé avec DataParser.
7. Le callback `execute` reçoit `{ options, subject }` avec typage inféré.

## Autres exemples

### Commande racine minimale

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/exec/otherExample.ts-->
```

### Commande orientée sujet

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/exec/subjectExample.ts-->
```

## Syntaxe

```typescript
function exec(
  execute: () => void
): Promise<void>

function exec<
  GenericOptions extends readonly Option[],
  GenericSubject extends Subject
>(
  params: CreateCommandParams<GenericOptions, GenericSubject>,
  execute: (
    params: CreateCommandExecuteParams<GenericOptions, GenericSubject>
  ) => MaybePromise<void>
): Promise<void>
```

## Paramètres

- `execute` : handler racine appelé quand aucun objet `params` n'est fourni.
- `params` (`CreateCommandParams`) : configuration de la commande racine.
- `params.description` (`string`, optionnel) : affiché dans le rendu du help.
- `params.options` (`Option[]`, optionnel) : définitions d'options parsées avant exécution.
- `params.subject` (`Subject | Command[]`, optionnel) : sujet DataParser ou liste de sous-commandes.
- `execute` (surcharge 2) : reçoit `options` typées et `subject` typé optionnel.

## Valeur de retour

- `Promise<void>` : résolue une fois le dispatch et l'exécution terminés.

## Voir aussi

- [`create`](/fr/v0/api/command/create) - Construit un noeud de commande.
- [`createBooleanOption`](/fr/v0/api/command/createBooleanOption) - Construit une option drapeau booléenne.
- [`createOption`](/fr/v0/api/command/createOption) - Construit une option à valeur unique.
- [`createArrayOption`](/fr/v0/api/command/createArrayOption) - Construit une option tableau.
