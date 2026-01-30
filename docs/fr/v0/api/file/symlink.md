---
outline: [2, 3]
prev:
  text: "walkDirectory"
  link: "/fr/v0/api/file/walkDirectory/"
next:
  text: "readLink"
  link: "/fr/v0/api/file/readLink/"
description: "Crée un lien symbolique."
---

# symlink

Crée un lien symbolique.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/symlink/main.ts-->
```

## Syntaxe

```typescript
function symlink(
  oldPath: string,
  newPath: string,
  params?: {
    type: "file" | "dir" | "junction";
  }
): Promise<FileSystemLeft<"symlink"> | E.Ok>
```

## Paramètres

- `oldPath` : chemin cible du lien.
- `newPath` : chemin du lien a créer.
- `params.type` : type du lien (Windows uniquement).

## Valeur de retour

- `E.Ok` : si la création réussit.
- `FileSystemLeft<"symlink">` : si la création échoue.

## Notes

- Sur Windows, `type` peut etre `"file"`, `"dir"` ou `"junction"`.

## Voir aussi

- [`readLink`](/fr/v0/api/file/readLink) - Lit la cible d'un lien symbolique.
- [`link`](/fr/v0/api/file/link) - Crée un lien physique.
