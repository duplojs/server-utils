---
outline: [2, 3]
prev:
  text: "makeDirectory"
  link: "/fr/v0/api/file/makeDirectory/"
next:
  text: "walkDirectory"
  link: "/fr/v0/api/file/walkDirectory/"
description: "S'assure qu'un dossier existe."
---

# ensureDirectory

S'assure qu'un dossier existe.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/ensureDirectory/main.ts-->
```

## Syntaxe

```typescript
function ensureDirectory(
  path: string | URL
): Promise<FileSystemLeft | E.Ok>
```

## Paramètres

- `path` : chemin du dossier a garantir.

## Valeur de retour

- `E.Ok` : si le dossier existe ou a ete crée.
- `FileSystemLeft` : si l'opération échoue.

## Voir aussi

- [`makeDirectory`](/fr/v0/api/file/makeDirectory) - Crée un dossier.
