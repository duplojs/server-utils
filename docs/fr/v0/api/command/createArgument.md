---
outline: [2, 3]
prev:
  text: "create"
  link: "/fr/v0/api/command/create"
next:
  text: "createBooleanOption"
  link: "/fr/v0/api/command/createBooleanOption"
description: "Crée un parseur d'argument positionnel pour les sujets de commande."
---

# createArgument

Crée un parseur d'argument positionnel à utiliser dans `subjects`.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/createArgument/main.ts-->
```

## Syntaxe

```typescript
function createArgument<
  GenericName extends string,
  GenericSpec extends EligibleSpec
>(
  name: GenericName,
  spec: GenericSpec,
  params?: {
    description?: string
    optional?: false
  }
): Argument<GenericName, EligibleSpecOutput<GenericSpec>>

function createArgument<
  GenericName extends string,
  GenericSpec extends EligibleSpec
>(
  name: GenericName,
  spec: GenericSpec,
  params?: {
    description?: string
    optional: boolean
  }
): Argument<GenericName, EligibleSpecOutput<GenericSpec> | undefined>
```

## Paramètres

- `name` (`string`) : clé d'argument exposée dans `args`.
- `spec` (`EligibleSpec`) : spec parser/clean utilisée pour parser et valider la valeur positionnelle reçue.
- `params` (optionnel) : métadonnées de l'argument.
- `params.description` (`string`, optionnel) : description dans le help.
- `params.optional` (`boolean`, défaut `false`) : autorise l'absence de l'argument.

## Valeur de retour

- `Argument` : définition d'argument à placer dans `subjects` de [`create`](/fr/v0/api/command/create) ou [`exec`](/fr/v0/api/command/exec).

## Notes

- Les arguments positionnels sont consommés dans l'ordre de déclaration.
- Dans les handlers d'exécution, les valeurs parsées sont disponibles via `args.<name>`.
- Utiliser uniquement des valeurs `EligibleSpec` (specs primitives, literals, unions, pipe/transform, file, specs clean).

## Voir aussi

- [`create`](/fr/v0/api/command/create) - Construit un noeud de commande avec `subjects`.
- [`exec`](/fr/v0/api/command/exec) - Exécute une commande racine depuis les arguments du process.
