---
outline: [2, 3]
prev:
  text: "remove"
  link: "/fr/v0/api/file/remove/"
next:
  text: "move"
  link: "/fr/v0/api/file/move/"
description: "Copie un fichier ou un dossier."
---

# copy

Copie un fichier ou un dossier.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/copy/main.ts-->
```

## Syntaxe

```typescript
function copy(
  fromPath: string,
  toPath: string
): Promise<FileSystemLeft<"copy"> | E.Ok>
```

## Paramètres

- `fromPath` : chemin source.
- `toPath` : chemin de destination.

## Valeur de retour

- `E.Ok` : si la copie réussit.
- `FileSystemLeft<"copy">` : si la copie échoue.

## Voir aussi

- [`move`](/fr/v0/api/file/move) - Déplace un fichier ou un dossier.
