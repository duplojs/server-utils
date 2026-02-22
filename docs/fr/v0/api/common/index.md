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
import * as DServerCommon from "@duplojs/server-utils/common";
```

## Variables d'environnement

### [`environmentVariable`](/fr/v0/api/common/environmentVariable)
charge les variables d'environnement depuis le runtime et des fichiers optionnels, les valide, puis retourne un résultat Either. Version throw disponible: `environmentVariableOrThrow`.

## Répertoire courant

### [`getCurrentWorkDirectory`](/fr/v0/api/common/getCurrentWorkDirectory)
retourne le répertoire de travail courant pour le runtime actif. Version throw disponible: `getCurrentWorkDirectoryOrThrow`.

### [`setCurrentWorkingDirectory`](/fr/v0/api/common/setCurrentWorkingDirectory)
change le répertoire de travail courant vers un dossier cible.

## Processus

### [`getProcessArguments`](/fr/v0/api/common/getProcessArguments)
retourne les arguments du processus passés en ligne de commande.

### [`exitProcess`](/fr/v0/api/common/exitProcess)
arrête le processus courant avec un code de sortie optionnel.
