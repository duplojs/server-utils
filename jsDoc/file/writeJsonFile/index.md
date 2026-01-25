Serialize and write JSON to a file.

Stringify the data and write it as UTF-8 text, returning ok/fail.

```ts
{@include file/writeJsonFile/example.ts[3,6]}
```

@remarks If JSON.stringify throws, the function returns a fail.

@see https://server-utils.duplojs.dev/en/v1/api/file/writeJsonFile
@namespace SF
