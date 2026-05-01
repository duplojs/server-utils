---
outline: [2, 3]
prev:
  text: "createBooleanOption"
  link: "/fr/v0/api/command/createBooleanOption"
next:
  text: "createArrayOption"
  link: "/fr/v0/api/command/createArrayOption"
description: "Crée une option à valeur unique depuis un DataParser ou un contrat clean."
---

# createOption

Crée une option à valeur unique depuis un DataParser ou un contrat clean.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/createOption/main.ts-->
```

## Syntaxe

```typescript
function createOption<
  GenericName extends string,
  GenericContract extends EligibleContract,
  GenericOutput extends ComputeOptionContract<GenericContract> = ComputeOptionContract<GenericContract>
>(
  name: GenericName,
  contract: GenericContract,
  params: {
    description?: string
    aliases?: readonly string[]
    required: true
  }
): Option<GenericName, GenericOutput>

function createOption<
  GenericName extends string,
  GenericContract extends EligibleContract,
  GenericOutput extends ComputeOptionContract<GenericContract> = ComputeOptionContract<GenericContract>
>(
  name: GenericName,
  contract: GenericContract,
  params?: {
    description?: string
    aliases?: readonly string[]
  }
): Option<GenericName, GenericOutput | undefined>
```

## Paramètres

- `name` (`string`) : nom de l'option utilisé comme `--name`.
- `contract` (`EligibleContract`) : parseur ou contrat clean utilisé pour valider/transformer la valeur.
- `params` (optionnel) : métadonnées d'option et comportement d'obligation.
- `params.required` (`true`, optionnel) : déclenche une erreur si l'option est absente.
- `params.description` (`string`, optionnel) : description dans le help.
- `params.aliases` (`string[]`, optionnel) : alias courts.

## Valeur de retour

- `Option<GenericName, GenericOutput>` quand `required: true`.
- `Option<GenericName, GenericOutput | undefined>` sinon.

## Notes

- Les parsers primitifs et les contrats clean primitifs sont coercés automatiquement depuis l'entrée CLI en chaîne.

## Voir aussi

- [`createBooleanOption`](/fr/v0/api/command/createBooleanOption) - Construit une option drapeau booléenne.
- [`createArrayOption`](/fr/v0/api/command/createArrayOption) - Construit une option tableau.
- [`create`](/fr/v0/api/command/create) - Construit une commande utilisant cette option.
