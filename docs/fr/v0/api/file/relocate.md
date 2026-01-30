---
outline: [2, 3]
prev:
  text: "move"
  link: "/fr/v0/api/file/move/"
next:
  text: "rename"
  link: "/fr/v0/api/file/rename/"
description: "Relocate un chemin dans un nouveau dossier parent."
---

# relocate

Relocate un chemin dans un nouveau dossier parent.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/relocate/main.ts-->
```

## Syntaxe

```typescript
function relocate(
  fromPath: string,
  newParentPath: string
): Promise<FileSystemLeft<"relocate"> | E.Success<string>>
```

## Parametres

- `fromPath` : chemin a relocaliser.
- `newParentPath` : dossier parent de destination.

## Valeur de retour

- `E.Success<string>` : le nouveau chemin lorsque la relocalisation reussit.
- `FileSystemLeft<"relocate">` : si la relocalisation echoue.

## Voir aussi

- [`move`](/fr/v0/api/file/move) - Deplace un fichier ou un dossier.
- [`rename`](/fr/v0/api/file/rename) - Renomme un fichier ou un dossier dans son dossier parent.
