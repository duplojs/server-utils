Build a file parser.

This parser validates that the input is a `FileInterface` (or coerces from a path when configured). It can also validate mime type, existence, and size constraints.

```ts
{@include dataParser/file/example.ts[3,20]}
```

@remarks
`parse` returns `E.Either` directly for synchronous checks.  
`asyncParse` returns `Promise<E.Either>` and is required for `checkExist`, `minSize`, and `maxSize`.

@see https://server-utils.duplojs.dev/en/v0/api/dataParser/file
@namespace SDP
