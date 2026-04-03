Change the current working directory or throw.

Update the current directory using the same behavior as `setCurrentWorkingDirectory`, but throw `SetCurrentWorkingDirectoryError` when the runtime cannot switch to the provided path.

```ts
{@include common/setCurrentWorkingDirectoryOrThrow/example.ts[1,15]}
```

@remarks
Use this variant when changing the current working directory is required and you want an exception-based failure flow instead of handling an `Either`.

@see https://server-utils.duplojs.dev/en/v0/api/common/setCurrentWorkingDirectory
