---
outline: [2, 3]
prev:
  text: "makeTemporaryDirectory"
  link: "/fr/v0/api/file/makeTemporaryDirectory/"
next:
  text: "ensureFile"
  link: "/fr/v0/api/file/ensureFile/"
description: "Crée un fichier temporaire."
---

# makeTemporaryFile

Crée un fichier temporaire.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/makeTemporaryFile/main.ts-->
```

## Syntaxe

```typescript
function makeTemporaryFile(
  prefix: string,
  suffix?: string
): Promise<FileSystemLeft<"make-temporary-file"> | E.Success<string>>
```

## Paramètres

- `prefix` : préfixe du fichier temporaire.
- `suffix` : suffixe optionnel (ex: extension).

## Valeur de retour

- `E.Success<string>` : chemin du fichier temporaire.
- `FileSystemLeft<"make-temporary-file">` : si la création échoue.

## Voir aussi

- [`makeTemporaryDirectory`](/fr/v0/api/file/makeTemporaryDirectory) - Crée un dossier temporaire.
