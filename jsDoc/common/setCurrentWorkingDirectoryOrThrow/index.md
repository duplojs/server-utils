Change the current working directory or throw.

Update the current directory with the same behavior as `setCurrentWorkingDirectory`.
Throw `SetCurrentWorkingDirectoryError` when the runtime cannot switch to the path.

```ts
{@include common/setCurrentWorkingDirectoryOrThrow/example.ts[1,15]}
```

@remarks
Errors are thrown instead of returned in an Either.

@see https://server-utils.duplojs.dev/en/v0/api/common/setCurrentWorkingDirectory
