---
description: "Présentation de @duplojs/server-utils, de ses objectifs et de ses familles de features."
next:
  text: "Bien démarrer"
  link: "/fr/v0/guide/quickStart"
---

# Introduction

`@duplojs/server-utils` rassemble les briques système qui reviennent dans les projets serveur: accès fichiers, variables d'environnement, arguments du process, commandes CLI et intégration avec les parsers de `@duplojs/utils`.

La librairie vise un objectif simple: écrire du code d'infrastructure lisible, typé et portable sans réimplémenter les mêmes helpers dans chaque projet.

## Rôle

`@duplojs/server-utils` sert de boîte à outils transverse dans l'écosystème DuploJS:

- centraliser les opérations système courantes avec une API homogène;
- retourner des résultats explicites, souvent sous forme d'`Either`, pour traiter les erreurs sans surprise;
- brancher les entrées externes sur les `DataParser` afin de valider et typer ce qui vient du système
- garder le même style d'usage sur Node, Bun et Deno.

## Ce que la librairie couvre

La partie `file` fournit les opérations de base sur le système de fichiers: lire, écrire, copier, déplacer, inspecter, créer des temporaires ou manipuler des interfaces fichier/dossier.

La partie `common` regroupe les helpers de runtime: arguments du process, répertoire courant, sortie de process et surtout `environmentVariable`, qui charge des fichiers d'environnement, développe les références entre variables, valide le tout avec un schéma et évite de dépendre d'un simple loader `.env`.

La partie `command` permet de construire des commandes CLI complètes: options typées, sujets positionnels, sous-commandes, génération de help et affichage propre des erreurs de parsing.

La partie `dataParser` ajoute des parsers utiles côté serveur, comme le parser de fichier, pour relier les validations de `@duplojs/utils` aux objets exposés par `@duplojs/server-utils`.
