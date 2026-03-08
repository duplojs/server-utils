Read a file as a byte stream.

Create an async generator that yields each file chunk as a Uint8Array, which is useful for large files or streaming transformations.

```ts
{@include file/readStream/example.ts[3,25]}
```

@remarks
Consume the returned async generator with `for await...of`.

@see https://server-utils.duplojs.dev/en/v0/api/file/readStream
@namespace SF
