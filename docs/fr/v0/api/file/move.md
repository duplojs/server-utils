---
outline: [2, 3]
prev:
  text: "copy"
  link: "/fr/v0/api/file/copy/"
next:
  text: "relocate"
  link: "/fr/v0/api/file/relocate/"
description: "Déplace un fichier ou un dossier."
---

# move

Déplace un fichier ou un dossier.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/move/main.ts-->
```

## Syntaxe

```typescript
function move(
  fromPath: string,
  toPath: string
): Promise<FileSystemLeft<"move"> | E.Ok>
```

## Paramètres

- `fromPath` : chemin source.
- `toPath` : chemin de destination.

## Valeur de retour

- `E.Ok` : si le déplacement réussit.
- `FileSystemLeft<"move">` : si le déplacement échoue.

## Voir aussi

- [`copy`](/fr/v0/api/file/copy) - Copie un fichier ou un dossier.
