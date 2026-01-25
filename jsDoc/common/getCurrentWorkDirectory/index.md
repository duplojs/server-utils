Return the current working directory.

Return an Either containing the current path for the active runtime (NODE/DENO),
or a fail if the working directory cannot be read.

```ts
{@include common/getCurrentWorkDirectory/example.ts[3,8]}
```

@see https://server-utils.duplojs.dev/en/v1/api/common/getCurrentWorkDirectory
