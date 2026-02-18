---
outline: [2, 3]
prev:
  text: "createBooleanOption"
  link: "/fr/v0/api/command/createBooleanOption"
next:
  text: "createArrayOption"
  link: "/fr/v0/api/command/createArrayOption"
description: "Crée une option avec une valeur unique parsée via un schéma DataParser."
---

# createOption

Crée une option avec une valeur unique parsée via un schéma DataParser.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/createOption/main.ts-->
```

## Syntaxe

```typescript
function createOption<
  GenericName extends string,
  GenericSchema extends EligibleDataParser
>(
  name: GenericName,
  schema: GenericSchema,
  params: {
    description?: string
    aliases?: readonly string[]
    required: true
  }
): Option<GenericName, DP.Output<GenericSchema>>

function createOption<
  GenericName extends string,
  GenericSchema extends EligibleDataParser
>(
  name: GenericName,
  schema: GenericSchema,
  params?: {
    description?: string
    aliases?: readonly string[]
  }
): Option<GenericName, DP.Output<GenericSchema> | undefined>
```

## Paramètres

- `name` (`string`) : nom de l'option utilisé comme `--name`.
- `schema` (`EligibleDataParser`) : parseur utilisé pour valider/transformer la valeur.
- `params` (optionnel) : métadonnées d'option et comportement d'obligation.
- `params.required` (`true`, optionnel) : déclenche une erreur si l'option est absente.
- `params.description` (`string`, optionnel) : description dans le help.
- `params.aliases` (`string[]`, optionnel) : alias courts.

## Valeur de retour

- `Option<GenericName, DP.Output<GenericSchema>>` quand `required: true`.
- `Option<GenericName, DP.Output<GenericSchema> | undefined>` sinon.

## Voir aussi

- [`createBooleanOption`](/fr/v0/api/command/createBooleanOption) - Construit une option drapeau booléenne.
- [`createArrayOption`](/fr/v0/api/command/createArrayOption) - Construit une option tableau.
- [`create`](/fr/v0/api/command/create) - Construit une commande utilisant cette option.
