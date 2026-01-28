---
outline: [2, 3]
prev:
  text: "fileInterface"
  link: "/fr/v0/api/file/fileInterface"
next:
  text: "unknownInterface"
  link: "/fr/v0/api/file/unknownInterface"
description: "Interface dossier avec des méthodes utilitaires."
---

# folderInterface

Interface dossier avec des méthodes utilitaires.

::: warning
L'objet `FolderInterface` ne garantit pas l'existence réelle du dossier. C'est uniquement un helper pour representer une ressource et faciliter les opérations.
:::

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/createFolderInterface/main.ts-->
```

## Syntaxe

```typescript
function createFolderInterface(
  path: string | URL
): FolderInterface
```

```typescript
function isFolderInterface(
  input: unknown
): input is FolderInterface
```

### Interface FolderInterface

```typescript
interface FolderInterface {
  name: string;
  path: string;
  getParentPath(): string;
  rename(newName: string): Promise<FileSystemLeft | E.Success<FolderInterface>>;
  exist(): Promise<FileSystemLeft | E.Ok>;
  relocate(parentPath: string | URL): Promise<FileSystemLeft | E.Success<FolderInterface>>;
  remove(): Promise<FileSystemLeft | E.Ok>;
  getChildren(): Promise<FileSystemLeft | E.Success<string[]>>;
  stat(): Promise<FileSystemLeft | E.Success<StatInfo>>;
  walk(): Promise<FileSystemLeft | E.Success<Generator<FolderInterface | FileInterface | UnknownInterface>>>;
}
```

## Paramètres

- `path` : chemin du dossier.

## Valeur de retour

- `FolderInterface` : interface avec des méthodes utilitaires (`rename(newName)`, `exist()`, `relocate(parentPath)`, `remove()`, `getChildren()`, `stat()`, `walk()`, `getParentPath()`).

## Voir aussi

- [`fileInterface`](/fr/v0/api/file/fileInterface) - Crée une interface fichier.
