---
outline: [2, 3]
prev:
  text: "rename"
  link: "/fr/v0/api/file/rename/"
next:
  text: "setMode"
  link: "/fr/v0/api/file/setMode/"
description: "Reduit ou etend un fichier a une taille donnée."
---

# truncate

Reduit ou etend un fichier a une taille donnée.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/truncate/main.ts-->
```

## Syntaxe

```typescript
function truncate(
  path: string | URL,
  size?: number
): Promise<FileSystemLeft | E.Ok>
```

## Paramètres

- `path` : chemin du fichier.
- `size` : nouvelle taille en octets (optionnel).

## Valeur de retour

- `E.Ok` : si l'opération réussit.
- `FileSystemLeft` : si l'opération échoue.

## Voir aussi

- [`writeFile`](/fr/v0/api/file/writeFile) - Écrit un contenu binaire dans un fichier.
