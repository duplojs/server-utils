---
outline: [2, 3]
description: "Construit un parser pour les fichiers. DServerDataParser.file() garantit que l'entrée est bien un fichier (avec support optionnel de la coercition) et retourne un Either typé contenant soit la valeur validée, soit un DataParserError détaillé."
prev:
  text: "Data Parser"
  link: "/fr/v0/api/dataParser/"
next:
  text: "Data Parser"
  link: "/fr/v0/api/dataParser/"
---

# file

Construit un parser pour les fichiers. `DServerDataParser.file()` garantit que l'entrée est un `FileInterface` (avec support optionnel de la coercition) et retourne un `Either` typé contenant soit la valeur validée, soit un `DataParserError` détaillé.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/dataParser/file/main.ts-->
```

## Paramètres

- `errorMessage` : message personnalisé utilisé lorsque l'entrée n'est pas un fichier et par défaut par les checkers qui ne définissent pas leur propre message.
- `checkers` : tableau de checkers (`checkerFileSize`, `checkerFileExist`, `checkerFileMimeType`, `checkerRefine`, etc.) exécutés après la validation de base.
- `coerce` : `true` pour transformer un chemin en `FileInterface`. Par défaut `false`.

## Valeur de retour

Un `DataParserFile` disposant de `parse`, `asyncParse`, `exec`, `asyncExec`, `addChecker` et `clone`.

Le parser File est synchrone par défaut. `checkerFileMimeType` est également synchrone, tandis que `checkerFileExist` et `checkerFileSize` sont asynchrones, car ils lisent les informations du fichier.

- `schema.parse(data)` exécute les validations synchrones et renvoie un `DEither.Success<FileInterface>` ou un `DEither.Error<DataParserError>`. Il renvoie une erreur lorsque le parser contient un checker asynchrone.
- `schema.asyncParse(data)` attend les checkers asynchrones et renvoie une `Promise<DEither.Success<FileInterface>>` ou une `Promise<DEither.Error<DataParserError>>`.

## Autres exemples

### Checkers personnalisés

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/dataParser/file/checkers.ts-->
```

### Mode étendu

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/dataParser/file/extended.ts-->
```

### Différence entre `parse` et `asyncParse`

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/dataParser/file/parse-vs-async.ts-->
```

::: info
Cet exemple utilise `checkerFileExist` et `checkerFileSize`, deux checkers asynchrones qui lisent les informations du fichier. Il faut donc utiliser `asyncParse` pour attendre leur résultat. L'utilisation de `parse` sur ce parser retourne un `DataParserError`, car il ne peut pas exécuter ces checkers asynchrones.
:::

## Voir aussi

- [`fileInterface`](/fr/v0/api/file/fileInterface) - Crée une interface fichier.
