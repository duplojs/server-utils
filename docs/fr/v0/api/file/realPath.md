---
outline: [2, 3]
prev:
  text: "stat"
  link: "/fr/v0/api/file/stat/"
next:
  text: "remove"
  link: "/fr/v0/api/file/remove/"
description: "Résout un chemin vers sa forme canonique."
---

# realPath

Résout un chemin vers sa forme canonique.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/realPath/main.ts-->
```

## Syntaxe

```typescript
function realPath(
  path: string | URL
): Promise<FileSystemLeft | E.Success<string>>
```

## Paramètres

- `path` : chemin a résoudre.

## Valeur de retour

- `E.Success<string>` : chemin résolu.
- `FileSystemLeft` : si la résolution échoue.

## Voir aussi

- [`stat`](/fr/v0/api/file/stat) - Récupère les informations d'un chemin.
