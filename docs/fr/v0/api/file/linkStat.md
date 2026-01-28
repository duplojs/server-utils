---
outline: [2, 3]
prev:
  text: "link"
  link: "/fr/v0/api/file/link/"
next:
  text: "exists"
  link: "/fr/v0/api/file/exists/"
description: "Récupère les informations d'un lien symbolique."
---

# linkStat

Récupère les informations d'un lien symbolique (le lien lui-meme, pas la cible).

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/linkStat/main.ts-->
```

## Syntaxe

```typescript
function linkStat(
  path: string | URL
): Promise<FileSystemLeft | E.Success<StatInfo>>
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

- `path` : chemin du lien a analyser.

## Valeur de retour

- `E.Success<StatInfo>` : informations sur le lien.
- `FileSystemLeft` : si la lecture échoue.

## Notes

- `D.TheDate` est le type de date fourni par [`@duplojs/utils`](https://utils.duplojs.dev/fr/v1/api/date/).

## Voir aussi

- [`stat`](/fr/v0/api/file/stat) - Récupère les informations d'un chemin.
