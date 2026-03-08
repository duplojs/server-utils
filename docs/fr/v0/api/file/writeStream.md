---
outline: [2, 3]
prev:
  text: "writeTextFile"
  link: "/fr/v0/api/file/writeTextFile/"
next:
  text: "appendFile"
  link: "/fr/v0/api/file/appendFile/"
description: "Écrit un flux asynchrone de morceaux binaires dans un fichier."
---

# writeStream

Écrit un flux asynchrone de morceaux binaires dans un fichier.

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/writeStream/main.ts-->
```

## Syntaxe

```typescript
function writeStream(
  path: string,
  source: AsyncIterable<Uint8Array>
): Promise<FileSystemLeft<"write-stream"> | E.Ok>
```

## Paramètres

- `path` : chemin du fichier cible.
- `source` : itérable asynchrone qui produit les morceaux a écrire.

## Valeur de retour

- `E.Ok` : si l'écriture réussit.
- `FileSystemLeft<"write-stream">` : si l'écriture échoue.

## Voir aussi

- [`readStream`](/fr/v0/api/file/readStream) - Lit un fichier comme un flux asynchrone d'octets.
- [`writeFile`](/fr/v0/api/file/writeFile) - Écrit un buffer binaire complet en une fois.
