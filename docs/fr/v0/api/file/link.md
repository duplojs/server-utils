---
outline: [2, 3]
prev:
  text: "readLink"
  link: "/fr/v0/api/file/readLink/"
next:
  text: "linkStat"
  link: "/fr/v0/api/file/linkStat/"
description: "Crée un lien physique."
---

# link

Crée un lien physique.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/link/main.ts-->
```

## Syntaxe

```typescript
function link(
  existingPath: string | URL,
  newPath: string | URL
): Promise<FileSystemLeft | E.Ok>
```

## Paramètres

- `existingPath` : chemin de la ressource source.
- `newPath` : chemin du lien a créer.

## Valeur de retour

- `E.Ok` : si la création réussit.
- `FileSystemLeft` : si la création échoue.

## Voir aussi

- [`symlink`](/fr/v0/api/file/symlink) - Crée un lien symbolique.
