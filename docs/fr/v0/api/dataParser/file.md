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

- `errorMessage` : message personnalisé injecté dans chaque `issue` lorsque l'entrée n'est pas un fichier ou ne respecte pas les contraintes.
- `coerce` : `true` pour transformer un chemin en `FileInterface`. Par défaut `false`.
- `mimeType?`: `string`, `string[]` ou `RegExp` appliqué au mime type du fichier.
- `minSize?`: `number` ou `BytesInString` (`${number}${"b" | "kb" | "mb"...}`) pour contraindre une taille minimale au fichier. Cette vérification est effectuée uniquement via `asyncParse`.
- `maxSize?`: `number` ou `BytesInString` (`${number}${"b" | "kb" | "mb"...}`) pour contraindre une taille maximale au fichier. Cette vérification est effectuée uniquement via `asyncParse`.
- `checkExist?`: `true` pour vérifier que le fichier existe réellement. Cette vérification est effectuée uniquement via `asyncParse`.

## Valeur de retour

Un `DataParserFile` disposant de `parse`, `asyncParse`, `isAsynchronous` et `clone`.

- `schema.parse(data)` renvoie un `DEither.Success<FileInterface>` lorsque les validations synchrones passent, ou un `DEither.Error<DataParserError>`. Si `checkExist`, `minSize` ou `maxSize` sont activés, ce mode synchrone renvoie directement une erreur car ces contrôles nécessitent l'async.
- `schema.asyncParse(data)` exécute les validations complètes (dont existence réelle et contraintes de taille) et renvoie une `Promise<DEither.Success<FileInterface>>` lorsque toutes les validations passent, ou une `Promise<DEither.Error<DataParserError>>` avec les chemins (`path`), les messages et les valeurs rejetées.

## Autres exemples

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

## Voir aussi

- [`fileInterface`](/fr/v0/api/file/fileInterface) - Crée une interface fichier.
