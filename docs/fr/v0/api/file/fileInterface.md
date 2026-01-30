---
outline: [2, 3]
prev:
  text: "ensureFile"
  link: "/fr/v0/api/file/ensureFile"
next:
  text: "folderInterface"
  link: "/fr/v0/api/file/folderInterface"
description: "Interface fichier avec des méthodes utilitaires."
---

# fileInterface

Interface fichier avec des méthodes utilitaires.

::: warning
L'objet `FileInterface` ne garantit pas l'existence réelle du fichier. C'est uniquement un helper pour representer une ressource et faciliter les opérations.
:::

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/createFileInterface/main.ts-->
```

## Syntaxe

```typescript
function createFileInterface(
  path: string
): FileInterface
```

```typescript
function isFileInterface(
  input: unknown
): input is FileInterface
```

### Interface FileInterface

```typescript
interface FileInterface {
  path: string;
  getName(): string | null;
  getMimeType(): string | null;
  getExtension(): string | null;
  getParentPath(): string | null;
  rename(newName: string): Promise<FileSystemLeft<"rename"> | E.Success<FileInterface>>;
  relocate(parentPath: string): Promise<FileSystemLeft<"relocate"> | E.Success<FileInterface>>;
  move(newPath: string): Promise<FileSystemLeft<"move"> | E.Success<FileInterface>>;
  exists(): Promise<FileSystemLeft<"exists"> | E.Ok>;
  remove(): Promise<FileSystemLeft<"remove"> | E.Ok>;
  stat(): Promise<FileSystemLeft<"stat"> | E.Success<StatInfo>>;
}
```

## Paramètres

- `path` : chemin du fichier.

## Valeur de retour

- `FileInterface` : interface avec `path`, des getters (`getName`, `getExtension`, `getMimeType`, `getParentPath`) et des méthodes utilitaires comme `rename(newName)`, `exists()`, `relocate(parentPath)`, `move(newPath)`, `remove()` et `stat()`.

## Voir aussi

- [`stat`](/fr/v0/api/file/stat) - Récupère les informations d'un chemin.
