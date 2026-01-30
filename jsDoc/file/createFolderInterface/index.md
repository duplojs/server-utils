Create a folder interface with helper methods.

Return an object that exposes folder metadata and helper operations. (`getName()`, `getParentPath()`, `rename(newName)`, `exists()`, `relocate(parentPath)`, `move(newPath)`, `remove()`, `stat()`, `getChildren()`, `walk()`)

```ts
{@include file/createFolderInterface/example.ts[1,13]}
```

@see https://server-utils.duplojs.dev/en/v0/api/file/folderInterface
@namespace SF
