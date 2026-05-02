---
description: "Découvrir les principales features de @duplojs/server-utils et savoir quand les utiliser."
prev:
  text: "Introduction"
  link: "/fr/v0/guide/"
next:
  text: "Créer une commande"
  link: "/fr/v0/guide/command"
---

# Bien démarrer

## Installation

`@duplojs/server-utils` s'utilise avec `@duplojs/utils`, qui fournit notamment `Either` et les `DataParser`.

::: code-group
```bash [npm]
npm install @duplojs/server-utils@0 @duplojs/utils@1
```
```bash [yarn]
yarn add @duplojs/server-utils@0 @duplojs/utils@1
```
```bash [pnpm]
pnpm add @duplojs/server-utils@0 @duplojs/utils@1
```
```bash [bun]
bun add @duplojs/server-utils@0 @duplojs/utils@1
```
```bash [deno]
deno add npm:@duplojs/server-utils@0 npm:@duplojs/utils@1
```
:::

La librairie est pensée pour uniformiser les usages entre les runtimes modernes côté serveur: Node, Bun et Deno. Avec la même API, vous gardez le même comportement applicatif même si le runtime change.

## File

Le namespace `file` couvre les opérations de fichiers sans vous enfermer dans une API spécifique à un runtime.

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/guide/quickStart/file.ts-->
```

Vous l'utilisez pour lire ou écrire des fichiers, manipuler du JSON, créer des dossiers temporaires, parcourir une arborescence ou déplacer des ressources.

Les interfaces `fileInterface`, `folderInterface` et `unknownInterface` servent à représenter une ressource autrement que par son `path`. Vous partez d'un chemin, vous l'identifiez comme fichier, dossier ou ressource inconnue, puis vous manipulez cette représentation avec des méthodes cohérentes. C'est utile quand une ressource doit circuler dans votre code comme un objet métier plutôt que comme une simple chaîne.

## Common

Le namespace `common` regroupe les helpers liés au runtime. Le plus important pour une application est souvent `environmentVariable`: il charge les variables du process et des fichiers env, développe les références, puis valide le résultat avec des `DataParser`.

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/guide/quickStart/environmentVariable.ts-->
```

Cette approche remplace le chargement aveugle d'un fichier `.env` par une vraie frontière de validation. Les variables invalides sont détectées au démarrage, les types sont connus dans le code, et les fichiers env restent optionnels selon votre stratégie.

## Command

Le namespace `command` sert à construire des CLI typées. Vous déclarez des options, des arguments positionnels et des sous-commandes; la librairie se charge de lire les arguments du process, de générer le help et de transformer les erreurs de parsing en messages lisibles.

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/guide/quickStart/command.ts-->
```

Pour un script qui n'a besoin que d'options, `execOptions` est la version légère: vous gardez le parsing typé et le help automatique sans construire une commande complète.

## API

Les guides donnent le contexte et le chemin de lecture. Pour les signatures complètes, consultez ensuite les namespaces de référence:

- [`Common`](/fr/v0/api/common/) pour le runtime et les variables d'environnement;
- [`File`](/fr/v0/api/file/) pour le système de fichiers;
- [`Command`](/fr/v0/api/command/) pour les CLI;
- [`DataParser`](/fr/v0/api/dataParser/) pour les parsers serveur.
