---
outline: [2, 3]
prev:
  text: "folderInterface"
  link: "/fr/v0/api/file/folderInterface"
next:
  text: "Référence API"
  link: "/fr/v0/api/"
description: "Interface pour un chemin de type inconnu."
---

# unknownInterface

Interface pour un chemin de type inconnu.

::: warning
L'objet `UnknownInterface` ne garantit pas l'existence réelle du chemin. C'est uniquement un helper pour representer une ressource et faciliter les opérations.
:::

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/createUnknownInterface/main.ts-->
```

## Syntaxe

```typescript
function createUnknownInterface(
  path: string
): UnknownInterface
```

```typescript
function isUnknownInterface(
  input: unknown
): input is UnknownInterface
```

### Interface UnknownInterface

```typescript
interface UnknownInterface {
  path: string;
  getName(): string | null;
  getParentPath(): string | null;
  stat(): Promise<FileSystemLeft<"stat"> | E.Success<StatInfo>>;
  exist(): Promise<FileSystemLeft<"exists"> | E.Ok>;
}
```

## Paramètres

- `path` : chemin de la ressource.

## Valeur de retour

- `UnknownInterface` : interface avec des getters (`getName`, `getParentPath`) et des méthodes utilitaires (`exist`, `stat`).

## Voir aussi

- [`folderInterface`](/fr/v0/api/file/folderInterface) - Crée une interface dossier.
