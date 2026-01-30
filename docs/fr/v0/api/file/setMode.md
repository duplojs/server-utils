---
outline: [2, 3]
prev:
  text: "truncate"
  link: "/fr/v0/api/file/truncate/"
next:
  text: "setOwner"
  link: "/fr/v0/api/file/setOwner/"
description: "Definit les permissions d'un fichier ou dossier."
---

# setMode

Definit les permissions d'un fichier ou dossier.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/setMode/main.ts-->
```

## Syntaxe

```typescript
function setMode(
  path: string,
  mode: ModeObject | number
): Promise<FileSystemLeft<"set-mode"> | E.Ok>
```

### ModeObject

```typescript
interface Permissions {
  read?: boolean;
  write?: boolean;
  exec?: boolean;
}

interface ModeObject {
  user?: Permissions;
  group?: Permissions;
  other?: Permissions;
  setUserId?: boolean;
  setGroupId?: boolean;
  sticky?: boolean;
}
```

## Paramètres

- `path` : chemin cible.
- `mode` : mode numérique (ex: `0o644`) ou objet de permissions.

## Valeur de retour

- `E.Ok` : si l'opération réussit.
- `FileSystemLeft<"set-mode">` : si l'opération échoue.

## Notes

- Les permissions en objet sont converties en mode numérique.

## Voir aussi

- [`setOwner`](/fr/v0/api/file/setOwner) - Definit le propriétaire d'un fichier ou dossier.
