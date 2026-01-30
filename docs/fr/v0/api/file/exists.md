---
outline: [2, 3]
prev:
  text: "linkStat"
  link: "/fr/v0/api/file/linkStat/"
next:
  text: "stat"
  link: "/fr/v0/api/file/stat/"
description: "Vérifie qu'un chemin existe."
---

# exists

Vérifie qu'un chemin existe.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/exists/main.ts-->
```

## Syntaxe

```typescript
function exists(
  path: string
): Promise<FileSystemLeft<"exists"> | E.Ok>
```

## Paramètres

- `path` : chemin a verifier.

## Valeur de retour

- `E.Ok` : si le chemin existe.
- `FileSystemLeft<"exists">` : si le chemin n'existe pas ou si la verification échoue.

## Voir aussi

- [`stat`](/fr/v0/api/file/stat) - Récupère les informations d'un chemin.
