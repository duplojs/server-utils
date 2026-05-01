---
outline: [2, 3]
prev:
  text: "createOption"
  link: "/fr/v0/api/command/createOption"
next:
  text: "Référence API"
  link: "/fr/v0/api/"
description: "Crée une option qui parse une liste délimitée vers un tableau typé depuis un DataParser ou un contrat clean."
---

# createArrayOption

Crée une option qui parse une liste séparée en tableau typé.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/createArrayOption/main.ts-->
```

## Syntaxe

```typescript
function createArrayOption<
  GenericName extends string,
  GenericContract extends EligibleContract,
  GenericMinValues extends number
>(
  name: GenericName,
  contract: GenericContract,
  params: {
    description?: string
    aliases?: readonly string[]
    min?: GenericMinValues
    max?: number
    required: true
    separator?: string
  }
): Option<
  GenericName,
  [
    ...A.CreateTuple<ComputeOptionContract<GenericContract>, GenericMinValues>,
    ...ComputeOptionContract<GenericContract>[]
  ]
>

function createArrayOption<
  GenericName extends string,
  GenericContract extends EligibleContract,
  GenericMinValues extends number
>(
  name: GenericName,
  contract: GenericContract,
  params?: {
    description?: string
    aliases?: readonly string[]
    min?: GenericMinValues
    max?: number
    separator?: string
  }
): Option<
  GenericName,
  | [
      ...A.CreateTuple<ComputeOptionContract<GenericContract>, GenericMinValues>,
      ...ComputeOptionContract<GenericContract>[]
    ]
  | undefined
>
```

## Paramètres

- `name` (`string`) : nom de l'option utilisé comme `--name`.
- `contract` (`EligibleContract`) : parseur ou contrat clean pour chaque élément du tableau.
- `params` (optionnel) : métadonnées et contraintes de tableau.
- `params.required` (`true`, optionnel) : déclenche une erreur si l'option est absente.
- `params.min` (`number`, optionnel) : nombre minimal de valeurs.
- `params.max` (`number`, optionnel) : nombre maximal de valeurs.
- `params.separator` (`string`, par défaut `","`) : séparateur d'entrée.
- `params.description` (`string`, optionnel) : description dans le help.
- `params.aliases` (`string[]`, optionnel) : alias courts.

## Valeur de retour

- Mode requis: `Option<GenericName, [..items]>`.
- Mode optionnel: `Option<GenericName, [..items] | undefined>`.

## Notes

- Les parsers primitifs et les contrats clean primitifs sont coercés automatiquement depuis l'entrée CLI en chaîne.

## Voir aussi

- [`createOption`](/fr/v0/api/command/createOption) - Construit une option à valeur unique.
- [`createBooleanOption`](/fr/v0/api/command/createBooleanOption) - Construit une option drapeau booléenne.
- [`create`](/fr/v0/api/command/create) - Construit une commande utilisant cette option.
