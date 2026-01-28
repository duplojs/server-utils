---
outline: [2, 3]
prev:
  text: "ensureFile"
  link: "/fr/v0/api/file/ensureFile"
next:
  text: "fileInterface"
  link: "/fr/v0/api/file/fileInterface"
description: "Utilitaires MIME type et extensions supportees."
---

# mimeType

Utilitaires MIME type et extensions supportees.

::: warning
Si vous avez des extensions ou des MIME types non supportes, vous pouvez surcharger la `Map` `mimeType` pour les ajouter.
:::

## Exemple

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/file/mimeType/main.ts-->
```

## Export

### Map `mimeType`

`mimeType` est une `Map` qui associe une extension de fichier a un MIME type supporte.

```typescript
const mimeType: Map<string, SupportedMimeType>;
```

### Fonction `isSupportedExtensionFile`

```typescript
function isSupportedExtensionFile(
  input: string
): input is SupportedExtensionFile
```

### Types exportés

- `SupportedMimeType`
- `SupportedExtensionFile`

## Notes

- Les extensions sont sans point (ex: `"png"`). Certaines entrées incluent un préfixe `"*"` tel que defini dans la base.

## Voir aussi

- [`fileInterface`](/fr/v0/api/file/fileInterface) - Crée une interface fichier.
