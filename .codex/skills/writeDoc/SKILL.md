---
name: writeDoc
description: Write or update @duplojs/server-utils documentation pages (Fe index pages, and guides, following the repo's structure, MonacoTSEditor examples, required sections, and prev/next R/EN) including API function pages, namespacmetadata.
---

# Documentation du projet

## Identifier le type de page

- Utiliser ces chemins comme source de verite.
- Choisir le format de page avant de rediger.
- Toujours maintenir la doc dans les deux langues (FR et EN) et garder les sections synchronisees.

Chemins:

- `docs/{fr,en}/index.md`: pages home.
- `docs/{fr,en}/v0/guide/*.md`: guides.
- `docs/{fr,en}/v0/api/{namespace}/index.md`: sommaire + presentation du namespace.
- `docs/{fr,en}/v0/api/{namespace}/{function}.md`: documentation d'une fonction.
- `docs/{fr,en}/v0/api/{namespace}/{concept + function}.md`: cas specifiques (rare).
- `docs/examples/v0/api/{namespace}/{function}/main.ts`: exemple simple.
- `docs/examples/v0/api/{namespace}/{function}/otherExample.ts`: cas specifiques.

## Respecter les regles des exemples

- Ecrire les commentaires en anglais.
- Utiliser des noms de variables de plus de 2 caracteres.
- Wrapper les structures avec plus d'un element (retours a la ligne, un element par ligne).
- Importer uniquement depuis `@duplojs/server-utils` ou `@duplojs/utils` (jamais de chemin relatif).

Exemple:

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/{namespace}/{function}/main.ts-->
```

## Contenu des exemples

- Les exemples doivent etre simples et didactiques.
- Eviter de montrer plusieurs fonctions dans un meme exemple sauf si le contexte l'exige.
- Pour les fonctions avec predicate, garder un contexte minimal et ajouter un `ExpectType` pour rendre le type explicite (utile en mobile).

Templates d'exemples disponibles (a adapter):

- `assets/example-basic-template.md`
- `assets/example-predicate-template.md`

## Rediger une page API (fonction)

- Partir du template `assets/api-function-template.md`.
- Copier/coller la description courte dans `description` du frontmatter.
- Inclure la version currifiee si elle existe.
- Ajouter "Voir aussi" avec des liens voisins ou proches.
- Ajouter "Sources" seulement si une reference externe est utile.
- Pour les cas specifiques, utiliser `docs/{fr,en}/v0/api/{namespace}/{concept + function}.md` et des exemples dedies dans `docs/examples/v0/api/{namespace}/{function}/`.
- Quand une page est ajoutee, mettre a jour le sommaire du namespace (`docs/{fr,en}/v0/api/{namespace}/index.md`) et reajuster les liens `prev`/`next` des pages voisines pour inserer la page correctement.

Format obligatoire:

- Frontmatter YAML: `outline`, `prev`, `next`, `description`.
- Contenu: `# NomDeLaFonction`, description courte, exemple interactif, syntaxe, parametres, valeur de retour, voir aussi.
