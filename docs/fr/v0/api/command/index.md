---
outline: [2, 3]
description: "Utilitaires de commandes CLI pour composer des arbres de commandes, parser options/sujets, afficher le help et exécuter les handlers."
prev:
  text: "DataParser"
  link: "/fr/v0/api/dataParser/"
next:
  text: "exec"
  link: "/fr/v0/api/command/exec"
---

# Command

Utilitaires de commandes CLI pour composer des arbres de commandes, parser options/sujets, afficher le help et exécuter les handlers.

## Comment faire les imports ?

La bibliothèque expose les namespaces `DServerCommand` et `SC` depuis l'entrée principale **ou** en import direct (tree-shaking friendly).

```typescript
import { DServerCommand, SC } from "@duplojs/server-utils";
import * as DServerCommand from "@duplojs/server-utils/command";
import * as SC from "@duplojs/server-utils/command";
```

## Point d'entrée

### [`exec`](/fr/v0/api/command/exec)
crée la commande racine, lit les arguments du process, puis exécute l'arbre de commandes.

### [`execOptions`](/fr/v0/api/command/execOptions)
parse uniquement les options depuis les arguments du process.

## Construction de commandes

### [`create`](/fr/v0/api/command/create)
crée une commande avec description, options et sujet optionnels.

## Construction d'options

### [`createBooleanOption`](/fr/v0/api/command/createBooleanOption)
crée une option drapeau qui retourne `true` quand elle est présente.

### [`createOption`](/fr/v0/api/command/createOption)
crée une option avec une valeur unique parsée.

### [`createArrayOption`](/fr/v0/api/command/createArrayOption)
crée une option qui parse une liste de valeurs séparées.
