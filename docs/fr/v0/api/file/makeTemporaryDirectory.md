---
outline: [2, 3]
prev:
  text: "setTime"
  link: "/fr/v0/api/file/setTime/"
next:
  text: "makeTemporaryFile"
  link: "/fr/v0/api/file/makeTemporaryFile/"
description: "Crée un dossier temporaire."
---

# makeTemporaryDirectory

Crée un dossier temporaire.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/makeTemporaryDirectory/main.ts-->
```

## Syntaxe

```typescript
function makeTemporaryDirectory(
  prefix: string
): Promise<FileSystemLeft | E.Success<string>>
```

## Paramètres

- `prefix` : préfixe du dossier temporaire.

## Valeur de retour

- `E.Success<string>` : chemin du dossier temporaire.
- `FileSystemLeft` : si la création échoue.

## Voir aussi

- [`makeTemporaryFile`](/fr/v0/api/file/makeTemporaryFile) - Crée un fichier temporaire.
