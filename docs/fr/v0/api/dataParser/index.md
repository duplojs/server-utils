---
outline: [2, 3]
description: "Fonctions pour construire, composer et exécuter des validateurs immuables. ServerDataParser. ou SDP. décrit la forme attendue des données, renvoie un Either (parse / asyncParse) et produit des erreurs structurées prêtes à être sérialisées."
prev:
  text: "File"
  link: "/fr/v0/api/file/"
next:
  text: "Command"
  link: "/fr/v0/api/command/"
---

# Data Parser

Fonctions pour construire, composer et exécuter des validateurs immuables. `DServerDataParser.*` ou `SDP.*` décrit la forme attendue des données, renvoie un `Either` (`parse` / `asyncParse`) et produit des erreurs structurées prêtes à être sérialisées.

## Comment faire les imports ?

La bibliothèque expose les namespaces `DServerDataParser`, `DServerDataParserCoerce` et `DServerDataParserExtended` depuis l'entrée principale **ou** en import direct (tree-shaking friendly).

```typescript
// ServerDataParser 
import { DServerDataParser, SDP } from "@duplojs/utils";
import * as DServerDataParser from "@duplojs/utils/dataParser";
import * as SDP from "@duplojs/utils/dataParser";

// ServerDataParserCoerce
import { DServerDataParserCoerce, SDPC } from "@duplojs/utils";
import * as DServerDataParserCoerce from "@duplojs/utils/dataParserCoerce";
import * as SDPC from "@duplojs/utils/dataParserCoerce";

// ServerDataParserExtended
import { DServerDataParserExtended, SDPE } from "@duplojs/utils";
import * as DServerDataParserExtended from "@duplojs/utils/dataParserExtended";
import * as SDPE from "@duplojs/utils/dataParserExtended";
```

## Parsers files

### [file](/fr/v0/api/dataParser/file)
Valide les `FileInterface`, contraintes sur la taille et le mimeType du fichier. Supporte la coercition avec un path
