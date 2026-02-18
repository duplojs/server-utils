---
outline: [2, 3]
prev:
  text: "create"
  link: "/fr/v0/api/command/create"
next:
  text: "createOption"
  link: "/fr/v0/api/command/createOption"
description: "Crée une option booléenne qui vaut true si présente et false sinon."
---

# createBooleanOption

Crée une option booléenne qui vaut `true` si présente et `false` sinon.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/createBooleanOption/main.ts-->
```

## Syntaxe

```typescript
function createBooleanOption<GenericName extends string>(
  name: GenericName,
  params?: {
    description?: string
    aliases?: readonly string[]
  }
): Option<GenericName, boolean>
```

## Paramètres

- `name` (`string`) : nom de l'option utilisé comme `--name`.
- `params` (optionnel) : métadonnées supplémentaires de l'option.
- `params.description` (`string`, optionnel) : description dans le help.
- `params.aliases` (`string[]`, optionnel) : alias courts comme `-v`.

## Valeur de retour

- `Option<GenericName, boolean>` : parseur d'option qui retourne un booléen.

## Voir aussi

- [`createOption`](/fr/v0/api/command/createOption) - Construit une option à valeur unique.
- [`createArrayOption`](/fr/v0/api/command/createArrayOption) - Construit une option tableau.
- [`create`](/fr/v0/api/command/create) - Construit une commande utilisant cette option.
