---
outline: [2, 3]
description: "Utilitaires de système de fichiers pour lire, écrire et inspecter des chemins."
prev:
  text: "Common"
  link: "/fr/v0/api/common/"
next:
  text: "Référence API"
  link: "/fr/v0/api/"
---

# File

Utilitaires de système de fichiers pour lire, écrire et inspecter des chemins.

## Comment faire les imports ?

La bibliothèque expose les namespaces `DServerFile` et `SF` depuis l'entree principale **ou** en import direct (tree-shaking friendly), ce qui permet de ne charger que ce dont vous avez besoin.

```typescript
import { DServerFile, SF } from "@duplojs/server-utils";
import * as DServerFile from "@duplojs/server-utils/file";
import * as SF from "@duplojs/server-utils/file";
```

## Lecture

### [`readFile`](/fr/v0/api/file/readFile)
lit un fichier et retourne son contenu binaire.

### [`readTextFile`](/fr/v0/api/file/readTextFile)
lit un fichier texte et retourne son contenu.

## Écriture

### [`writeFile`](/fr/v0/api/file/writeFile)
écrit un contenu binaire dans un fichier.

### [`writeTextFile`](/fr/v0/api/file/writeTextFile)
écrit un contenu texte dans un fichier.

## Ajout

### [`appendFile`](/fr/v0/api/file/appendFile)
ajoute un contenu binaire a la fin d'un fichier.

### [`appendTextFile`](/fr/v0/api/file/appendTextFile)
ajoute un contenu texte a la fin d'un fichier.

## JSON

### [`readJsonFile`](/fr/v0/api/file/readJsonFile)
lit et parse un fichier JSON.

### [`writeJsonFile`](/fr/v0/api/file/writeJsonFile)
serialize et écrit un fichier JSON.

## Dossiers

### [`readDirectory`](/fr/v0/api/file/readDirectory)
liste les entrées d'un dossier.

### [`makeDirectory`](/fr/v0/api/file/makeDirectory)
crée un dossier.

### [`ensureDirectory`](/fr/v0/api/file/ensureDirectory)
s'assure qu'un dossier existe.

### [`walkDirectory`](/fr/v0/api/file/walkDirectory)
parcourt un dossier récursivement.

## Liens

### [`symlink`](/fr/v0/api/file/symlink)
crée un lien symbolique.

### [`readLink`](/fr/v0/api/file/readLink)
lit la cible d'un lien symbolique.

### [`link`](/fr/v0/api/file/link)
crée un lien physique.

### [`linkStat`](/fr/v0/api/file/linkStat)
récupère les informations d'un lien symbolique.

## Chemins et métadonnées

### [`exists`](/fr/v0/api/file/exists)
vérifie qu'un chemin existe.

### [`stat`](/fr/v0/api/file/stat)
récupère les informations d'un chemin.

### [`realPath`](/fr/v0/api/file/realPath)
résout un chemin vers sa forme canonique.

## Déplacement et copie

### [`remove`](/fr/v0/api/file/remove)
supprime un fichier ou un dossier.

### [`copy`](/fr/v0/api/file/copy)
copie un fichier ou un dossier.

### [`move`](/fr/v0/api/file/move)
déplace un fichier ou un dossier.

### [`relocate`](/fr/v0/api/file/relocate)
relocate un chemin dans un dossier parent.

### [`rename`](/fr/v0/api/file/rename)
renomme un fichier ou un dossier dans son dossier parent.

### [`truncate`](/fr/v0/api/file/truncate)
redimensionne un fichier a une taille donnée.

## Permissions et dates

### [`setMode`](/fr/v0/api/file/setMode)
definit les permissions d'un fichier ou dossier.

### [`setOwner`](/fr/v0/api/file/setOwner)
definit le propriétaire d'un fichier ou dossier.

### [`setTime`](/fr/v0/api/file/setTime)
met a jour les horodatages d'accès et de modification.

## Temporaires et helpers

### [`makeTemporaryDirectory`](/fr/v0/api/file/makeTemporaryDirectory)
crée un dossier temporaire.

### [`makeTemporaryFile`](/fr/v0/api/file/makeTemporaryFile)
crée un fichier temporaire.

### [`ensureFile`](/fr/v0/api/file/ensureFile)
s'assure qu'un fichier existe.

## Interfaces

### [`fileInterface`](/fr/v0/api/file/fileInterface)
crée une interface fichier avec des méthodes utilitaires.

### [`folderInterface`](/fr/v0/api/file/folderInterface)
crée une interface dossier avec des méthodes utilitaires.

### [`unknownInterface`](/fr/v0/api/file/unknownInterface)
crée une interface pour un chemin de type inconnu.
