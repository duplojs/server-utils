---
outline: [2, 3]
description: "Helpers transverses sans cas d’usage métier précis. Ce namespace regroupe des briques génériques."
prev:
  text: "Référence API"
  link: "/fr/v0/api/"
next:
  text: "File"
  link: "/fr/v0/api/file/"
---

# Common

Helpers transverses sans cas d’usage métier précis. Ce namespace regroupe des briques génériques.

## Comment faire les imports ?

Toutes les fonctions sont exportées depuis l'entrée principale ou via l'import direct (tree-shaking friendly).

```typescript
import { getCurrentWorkDirectory } from "@duplojs/server-utils";
import { DServerCommon, SC } from "@duplojs/server-utils";
import * as DServerCommon from "@duplojs/server-utils/common";
import * as SC from "@duplojs/server-utils/common";
```

## Répertoire courant

### [`getCurrentWorkDirectory`](/fr/v0/api/common/getCurrentWorkDirectory)
retourne le répertoire de travail courant pour le runtime actif.

### [`getCurrentWorkDirectoryOrThrow`](/fr/v0/api/common/getCurrentWorkDirectoryOrThrow)
retourne le répertoire de travail courant ou lance une erreur.

### [`setCurrentWorkingDirectory`](/fr/v0/api/common/setCurrentWorkingDirectory)
change le répertoire de travail courant à partir d'un chemin.
