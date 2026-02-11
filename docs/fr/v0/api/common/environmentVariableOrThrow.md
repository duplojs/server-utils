---
outline: [2, 3]
description: "Charge et valide les variables d'environnement, puis lance une erreur en cas d'échec."
prev:
  text: "environmentVariable"
  link: "/fr/v0/api/common/environmentVariable"
next:
  text: "Common"
  link: "/fr/v0/api/common/"
---

# environmentVariableOrThrow

Charge et valide les variables d'environnement, puis lance une erreur en cas d'échec.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/environmentVariableOrThrow/main.ts-->
```

## Syntaxe

```typescript
function environmentVariableOrThrow<
	GenericShape extends DP.DataParserObjectShape
>(
  shape: GenericShape,
  params?: EnvironmentVariableParams
): Promise<DP.DataParserObjectShapeOutput<GenericShape>>
```

## Paramètres

- `shape` (`GenericShape`) : schéma utilisé pour parser et valider les variables d'environnement.
- `params` (`EnvironmentVariableParams`, optionnel) : options de comportement.
- `params.paths` (`string[]`, optionnel) : chemins des fichiers env à lire.
- `params.override` (`boolean`, défaut `false`) : autorise les valeurs de fichier à remplacer les valeurs runtime existantes.
- `params.justRead` (`boolean`, défaut `false`) : lit et valide sans réécrire les variables dans l'environnement runtime.

## Valeur de retour

- `Promise<DP.DataParserObjectShapeOutput<GenericShape>>` : variables parsées conformes au schéma.

## Voir aussi

- [`environmentVariable`](/fr/v0/api/common/environmentVariable) - Retourne un résultat Either au lieu de lancer une erreur.
- [`getCurrentWorkDirectory`](/fr/v0/api/common/getCurrentWorkDirectory) - Retourne le répertoire de travail courant.
