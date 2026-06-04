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

- `errorMessage`: custom message used when the input is not a file and as the default for checkers that do not define their own message.
- `checkers`: array of checkers (`checkerFileSize`, `checkerFileExist`, `checkerFileMimeType`, `checkerRefine`, etc.) executed after the base validation.
- `coerce`: `true` to transform a path into `FileInterface`. Defaults to `false`.

## Return value

A `DataParserFile` exposing `parse`, `asyncParse`, `exec`, `asyncExec`, `addChecker`, and `clone`.

The File parser is synchronous by default. `checkerFileMimeType` is also synchronous, while `checkerFileExist` and `checkerFileSize` are asynchronous because they read file information.

- `schema.parse(data)` runs synchronous validations and returns a `DEither.Success<FileInterface>` or a `DEither.Error<DataParserError>`. It returns an error when the parser contains an asynchronous checker.
- `schema.asyncParse(data)` awaits asynchronous checkers and returns a `Promise<DEither.Success<FileInterface>>` or a `Promise<DEither.Error<DataParserError>>`.

## Other examples

### Custom checkers

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/dataParser/file/checkers.ts-->
```

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

::: info
This example uses `checkerFileExist` and `checkerFileSize`, two asynchronous checkers that read file information. You must therefore use `asyncParse` to await their result. Using `parse` on this parser returns a `DataParserError` because it cannot execute these asynchronous checkers.
:::

## See also

- [`fileInterface`](/en/v0/api/file/fileInterface) - Creates a file interface.
