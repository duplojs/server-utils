---
outline: [2, 3]
description: "Charge, développe et valide les variables d'environnement."
prev:
  text: "exitProcess"
  link: "/fr/v0/api/common/exitProcess"
next:
  text: "environmentVariableOrThrow"
  link: "/fr/v0/api/common/environmentVariableOrThrow"
---

# environmentVariable

Charge, développe et valide les variables d'environnement.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/environmentVariable/main.ts-->
```

## Syntaxe

```typescript
function environmentVariable<
	GenericShape extends DP.DataParserObjectShape
>(
  shape: GenericShape,
  params?: EnvironmentVariableParams
): Promise<
  | E.Success<DP.DataParserObjectShapeOutput<GenericShape>>
  | FileSystemLeft<"read-text-file">
  | E.Error<DP.DataParserError>
>
```

## Paramètres

- `shape` (`GenericShape`) : schéma utilisé pour parser et valider les variables d'environnement.
- `params` (`EnvironmentVariableParams`, optionnel) : options de comportement.
- `params.paths` (`string[]`, optionnel) : chemins des fichiers env à lire.
- `params.override` (`boolean`, défaut `false`) : autorise les valeurs de fichier à remplacer les valeurs runtime existantes.
- `params.justRead` (`boolean`, défaut `false`) : lit et valide sans réécrire les variables dans l'environnement runtime.

## Valeur de retour

- `E.Success<DP.DataParserObjectShapeOutput<GenericShape>>` : variables parsées conformes au schéma.
- `FileSystemLeft<"read-text-file">` : si la lecture d'un fichier env échoue.
- `E.Error<DP.DataParserError>` : si la validation du schéma échoue.

## Voir aussi

- [`environmentVariableOrThrow`](/fr/v0/api/common/environmentVariableOrThrow) - Lance une erreur au lieu de retourner une valeur left.
- [`setCurrentWorkingDirectory`](/fr/v0/api/common/setCurrentWorkingDirectory) - Change le répertoire de travail courant.
