Create a folder interface with helper methods.

Return an object that exposes folder metadata and helper operations. (`getParentFolder()`, `rename(newName)`, `exist()`, `relocate(parentPath)`, `remove()`, `stat()`, `getChildren()`, `walk()`)

```ts
{@include file/createFolderInterface/example.ts[3,7]}
```

@see https://server-utils.duplojs.dev/en/v1/api/file/createFolderInterface
@namespace SF
