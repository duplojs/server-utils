---
outline: [2, 3]
prev:
  text: "readTextFile"
  link: "/fr/v0/api/file/readTextFile/"
next:
  text: "writeFile"
  link: "/fr/v0/api/file/writeFile/"
description: "Lit un fichier comme un flux asynchrone de morceaux binaires."
---

# readStream

Lit un fichier comme un flux asynchrone de morceaux binaires.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/readStream/main.ts-->
```

## Syntaxe

```typescript
function readStream(
  path: string
): AsyncGenerator<Uint8Array>
```

## Paramètres

- `path` : chemin du fichier a lire en flux.

## Valeur de retour

- `AsyncGenerator<Uint8Array>` : un générateur asynchrone qui produit chaque morceau du fichier sous forme de `Uint8Array`.

## Voir aussi

- [`readFile`](/fr/v0/api/file/readFile) - Lit tout le fichier en mémoire.
- [`writeStream`](/fr/v0/api/file/writeStream) - Écrit un flux asynchrone d'octets dans un fichier.
