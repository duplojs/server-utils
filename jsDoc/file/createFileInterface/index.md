Create a file interface with helper methods.

Return an object that exposes name, extension, and helper actions. (`getName()`, `getExtension()`, `getMimeType()`, `getParentPath()`, `rename(newName)`, `exists()`, `relocate(parentPath)`, `move(newPath)`, `remove()`, `stat()`)

```ts
{@include file/createFileInterface/example.ts[1,14]}
```

@see https://server-utils.duplojs.dev/en/v0/api/file/fileInterface

@namespace SF
