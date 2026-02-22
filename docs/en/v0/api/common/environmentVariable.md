---
outline: [2, 3]
description: "Loads, expands, and validates environment variables."
prev:
  text: "Common"
  link: "/en/v0/api/common/"
next:
  text: "getCurrentWorkDirectory"
  link: "/en/v0/api/common/getCurrentWorkDirectory"
---

# environmentVariable

Loads, expands, and validates environment variables.
This version returns an `Either` result.
If you prefer throwing behavior, use `environmentVariableOrThrow`.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/environmentVariable/main.ts-->
```

## Other examples

### Throw variant

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/environmentVariable/otherExample.ts-->
```

## Syntax

```typescript
function environmentVariable<
	GenericShape extends DP.DataParserObjectShape
>(
  shape: GenericShape,
  params?: EnvironmentVariableParams
): Promise<
  | E.Success<DP.DataParserObjectShapeOutput<GenericShape>>
  | FileSystemLeft<"read-text-file">
  | E.Error<DP.DataParserError>
>
```

## Parameters

- `shape` (`GenericShape`) : schema used to parse and validate environment variables.
- `params` (`EnvironmentVariableParams`, optional) : behavior options.
- `params.paths` (`string[]`, optional) : env file paths to read.
- `params.override` (`boolean`, default `false`) : allows file values to replace existing runtime values.
- `params.justRead` (`boolean`, default `false`) : reads and validates without writing back to runtime environment variables.

## Return value

- `E.Success<DP.DataParserObjectShapeOutput<GenericShape>>` : parsed variables that match the schema.
- `FileSystemLeft<"read-text-file">` : if reading an env file fails.
- `E.Error<DP.DataParserError>` : if schema validation fails.

## See also

- [`setCurrentWorkingDirectory`](/en/v0/api/common/setCurrentWorkingDirectory) - Changes the current working directory.
