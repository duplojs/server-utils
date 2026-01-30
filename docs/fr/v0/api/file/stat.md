---
outline: [2, 3]
prev:
  text: "exists"
  link: "/fr/v0/api/file/exists/"
next:
  text: "realPath"
  link: "/fr/v0/api/file/realPath/"
description: "Récupère les informations d'un chemin."
---

# stat

Récupère les informations d'un chemin.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/stat/main.ts-->
```

## Syntaxe

```typescript
function stat(
  path: string
): Promise<FileSystemLeft<"stat"> | E.Success<StatInfo>>
```

### Interface StatInfo

```typescript
interface StatInfo {
  isFile: boolean;
  isDirectory: boolean;
  isSymlink: boolean;
  sizeBytes: number;
  modifiedAt: D.TheDate | null;
  accessedAt: D.TheDate | null;
  createdAt: D.TheDate | null;
  changedAt: D.TheDate | null;
  deviceId: number;
  inode: number | null;
  permissionsMode: number | null;
  hardLinkCount: number | null;
  ownerUserId: number | null;
  ownerGroupId: number | null;
  specialDeviceId: number | null;
  ioBlockSize: number | null;
  allocatedBlockCount: number | null;
  isBlockDevice: boolean | null;
  isCharacterDevice: boolean | null;
  isFifo: boolean | null;
  isSocket: boolean | null;
}
```

## Paramètres

- `path` : chemin a analyser.

## Valeur de retour

- `E.Success<StatInfo>` : informations sur le chemin (type, taille, dates, etc.).
- `FileSystemLeft<"stat">` : si la lecture échoue.

## Notes

- `D.TheDate` est le type de date fourni par [`@duplojs/utils`](https://utils.duplojs.dev/fr/v1/api/date/).

## Voir aussi

- [`exists`](/fr/v0/api/file/exists) - Vérifie qu'un chemin existe.
