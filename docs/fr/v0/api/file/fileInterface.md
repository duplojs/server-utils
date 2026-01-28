---
outline: [2, 3]
prev:
  text: "mimeType"
  link: "/fr/v0/api/file/mimeType"
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
  path: string | URL
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
  name: string;
  path: string;
  mimeType: SupportedMimeType | null;
  extension: SupportedExtensionFile | null;
  getParentPath(): string;
  rename(newName: string): Promise<FileSystemLeft | E.Success<FileInterface>>;
  exist(): Promise<FileSystemLeft | E.Ok>;
  relocate(parentPath: string | URL): Promise<FileSystemLeft | E.Success<FileInterface>>;
  remove(): Promise<FileSystemLeft | E.Ok>;
  stat(): Promise<FileSystemLeft | E.Success<StatInfo>>;
}
```

## Paramètres

- `path` : chemin du fichier.

## Valeur de retour

- `FileInterface` : interface avec `name`, `extension`, `mimeType`, `path` et des méthodes comme `rename(newName)`, `exist()`, `relocate(parentPath)`, `remove()`, `stat()` et `getParentPath()`.

## Voir aussi

- [`stat`](/fr/v0/api/file/stat) - Récupère les informations d'un chemin.
