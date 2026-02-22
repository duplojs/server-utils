---
outline: [2, 3]
description: "Retourne le répertoire de travail courant."
prev:
  text: "environmentVariable"
  link: "/fr/v0/api/common/environmentVariable"
next:
  text: "setCurrentWorkingDirectory"
  link: "/fr/v0/api/common/setCurrentWorkingDirectory"
---

# getCurrentWorkDirectory

Retourne le répertoire de travail courant.
Cette version retourne un résultat `Either`.
Si vous préférez une version qui lance une erreur directement, utilisez `getCurrentWorkDirectoryOrThrow`.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/getCurrentWorkDirectory/main.ts-->
```

## Autres exemples

### Version throw

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/getCurrentWorkDirectory/otherExample.ts-->
```

## Syntaxe

```typescript
function getCurrentWorkDirectory(): E.Error<unknown> | E.Success<string>
```

## Paramètres

Cette fonction ne prend aucun paramètre.

## Valeur de retour

- `E.Success<string>` : le chemin absolu du répertoire courant.
- `E.Error<unknown>` : si la lecture du répertoire courant échoue.

## Voir aussi

- [`setCurrentWorkingDirectory`](/fr/v0/api/common/setCurrentWorkingDirectory) - Change le répertoire de travail courant.
