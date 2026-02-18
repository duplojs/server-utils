---
outline: [2, 3]
description: "Loads, expands, and validates environment variables."
prev:
  text: "exitProcess"
  link: "/en/v0/api/common/exitProcess"
next:
  text: "environmentVariableOrThrow"
  link: "/en/v0/api/common/environmentVariableOrThrow"
---

# environmentVariable

Loads, expands, and validates environment variables.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/environmentVariable/main.ts-->
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

- [`environmentVariableOrThrow`](/en/v0/api/common/environmentVariableOrThrow) - Throws instead of returning a left value.
- [`setCurrentWorkingDirectory`](/en/v0/api/common/setCurrentWorkingDirectory) - Changes the current working directory.
