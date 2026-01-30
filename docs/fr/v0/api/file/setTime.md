---
outline: [2, 3]
prev:
  text: "setOwner"
  link: "/fr/v0/api/file/setOwner/"
next:
  text: "makeTemporaryDirectory"
  link: "/fr/v0/api/file/makeTemporaryDirectory/"
description: "Met a jour les horodatages d'accès et de modification."
---

# setTime

Met a jour les horodatages d'accès et de modification.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/setTime/main.ts-->
```

## Syntaxe

```typescript
function setTime(
  path: string,
  params: {
    accessTime: D.TheDate;
    modifiedTime: D.TheDate;
  }
): Promise<FileSystemLeft<"set-time"> | E.Ok>
```

## Paramètres

- `path` : chemin cible.
- `params.accessTime` : date d'accès.
- `params.modifiedTime` : date de modification.

## Valeur de retour

- `E.Ok` : si l'opération réussit.
- `FileSystemLeft<"set-time">` : si l'opération échoue.

## Notes

- `D.TheDate` est le type de date fourni par `@duplojs/utils`.

## Voir aussi

- [`setMode`](/fr/v0/api/file/setMode) - Definit les permissions d'un fichier ou dossier.
