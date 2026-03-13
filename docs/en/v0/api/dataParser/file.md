---
outline: [2, 3]
description: "Builds a parser for files. DServerDataParser.file() ensures the input is a file (with optional coercion support) and returns a typed Either containing either the validated value or a detailed DataParserError."
prev:
  text: "Data Parser"
  link: "/en/v0/api/dataParser/"
next:
  text: "Data Parser"
  link: "/en/v0/api/dataParser/"
---

# file

Builds a parser for files. `DServerDataParser.file()` ensures the input is a file (with optional coercion support) and returns a typed `Either` containing either the validated value or a detailed `DataParserError`.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/dataParser/file/main.ts-->
```

## Parameters

- `errorMessage`: custom message injected into each `issue` when the input is not a file or does not meet constraints.
- `coerce`: `true` to transform a path into `FileInterface`. Defaults to `false`.
- `mimeType?`: `string`, `[string, ...string[]]`, or `RegExp` applied to the file mime type.
- `minSize?`: `number` or `BytesInString` (`${number}${"b" | "kb" | "mb"...}`) to enforce a minimum file size. This check is only executed through `asyncParse`.
- `maxSize?`: `number` or `BytesInString` (`${number}${"b" | "kb" | "mb"...}`) to enforce a maximum file size. This check is only executed through `asyncParse`.
- `checkExist?`: `true` to check whether the file really exists. This check is only executed through `asyncParse`.

## Return value

A `DataParserFile` exposing `parse`, `asyncParse`, `isAsynchronous`, and `clone`.

- `schema.parse(data)` returns a `DEither.Success<FileInterface>` when synchronous checks pass, or a `DEither.Error<DataParserError>`. If `checkExist`, `minSize`, or `maxSize` are enabled, this synchronous mode immediately returns an error because these checks require async I/O.
- `schema.asyncParse(data)` runs full validation (including real file existence and size constraints) and returns a `Promise<DEither.Success<FileInterface>>` when all validations pass, or a `Promise<DEither.Error<DataParserError>>` with paths (`path`), messages, and rejected values.

## Other examples

### Extended mode

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/dataParser/file/extended.ts-->
```

### Difference between `parse` and `asyncParse`

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/dataParser/file/parse-vs-async.ts-->
```

## See also

- [`fileInterface`](/en/v0/api/file/fileInterface) - Creates a file interface.
