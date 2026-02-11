---
outline: [2, 3]
description: "Loads and validates environment variables, then throws on failure."
prev:
  text: "environmentVariable"
  link: "/en/v0/api/common/environmentVariable"
next:
  text: "Common"
  link: "/en/v0/api/common/"
---

# environmentVariableOrThrow

Loads and validates environment variables, then throws on failure.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/common/environmentVariableOrThrow/main.ts-->
```

## Syntax

```typescript
function environmentVariableOrThrow<
	GenericShape extends DP.DataParserObjectShape
>(
  shape: GenericShape,
  params?: EnvironmentVariableParams
): Promise<DP.DataParserObjectShapeOutput<GenericShape>>
```

## Parameters

- `shape` (`GenericShape`) : schema used to parse and validate environment variables.
- `params` (`EnvironmentVariableParams`, optional) : behavior options.
- `params.paths` (`string[]`, optional) : env file paths to read.
- `params.override` (`boolean`, default `false`) : allows file values to replace existing runtime values.
- `params.justRead` (`boolean`, default `false`) : reads and validates without writing back to runtime environment variables.

## Return value

- `Promise<DP.DataParserObjectShapeOutput<GenericShape>>` : parsed variables that match the schema.

## See also

- [`environmentVariable`](/en/v0/api/common/environmentVariable) - Returns an Either result instead of throwing.
- [`getCurrentWorkDirectory`](/en/v0/api/common/getCurrentWorkDirectory) - Returns the current working directory.
