Change the current working directory.

Update the current directory using a string path,
and return `E.Ok` when the runtime accepts the change.
Return `E.Fail` when it cannot switch to that path.
Errors are returned in the Either result.

```ts
{@include common/setCurrentWorkingDirectory/example.ts[3,11]}
```

@see https://server-utils.duplojs.dev/en/v0/api/common/setCurrentWorkingDirectory
