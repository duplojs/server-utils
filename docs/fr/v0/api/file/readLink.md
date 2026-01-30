---
outline: [2, 3]
prev:
  text: "symlink"
  link: "/fr/v0/api/file/symlink/"
next:
  text: "link"
  link: "/fr/v0/api/file/link/"
description: "Lit la cible d'un lien symbolique."
---

# readLink

Lit la cible d'un lien symbolique.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/readLink/main.ts-->
```

## Syntaxe

```typescript
function readLink(
  path: string
): Promise<FileSystemLeft<"read-link"> | E.Success<string>>
```

## Paramètres

- `path` : chemin du lien.

## Valeur de retour

- `E.Success<string>` : chemin cible du lien.
- `FileSystemLeft<"read-link">` : si la lecture échoue.

## Voir aussi

- [`symlink`](/fr/v0/api/file/symlink) - Crée un lien symbolique.
