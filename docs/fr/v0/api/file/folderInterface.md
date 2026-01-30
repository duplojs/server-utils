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
  path: string
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
  path: string;
  getName(): string | null;
  getParentPath(): string | null;
  rename(newName: string): Promise<FileSystemLeft<"rename"> | E.Success<FolderInterface>>;
  relocate(parentPath: string): Promise<FileSystemLeft<"relocate"> | E.Success<FolderInterface>>;
  move(newPath: string): Promise<FileSystemLeft<"move"> | E.Success<FolderInterface>>;
  exists(): Promise<FileSystemLeft<"exists"> | E.Ok>;
  remove(): Promise<FileSystemLeft<"remove"> | E.Ok>;
  getChildren(): Promise<FileSystemLeft<"read-directory"> | E.Success<string[]>>;
  stat(): Promise<FileSystemLeft<"stat"> | E.Success<StatInfo>>;
  walk(): Promise<FileSystemLeft<"walk-directory"> | E.Success<Generator<FolderInterface | FileInterface | UnknownInterface>>>;
}
```

## Paramètres

- `path` : chemin du dossier.

## Valeur de retour

- `FolderInterface` : interface avec des getters (`getName`, `getParentPath`) et des méthodes utilitaires (`rename(newName)`, `exists()`, `relocate(parentPath)`, `move(newPath)`, `remove()`, `getChildren()`, `stat()`, `walk()`).

## Voir aussi

- [`fileInterface`](/fr/v0/api/file/fileInterface) - Crée une interface fichier.
