---
outline: [2, 3]
prev:
  text: "createBooleanOption"
  link: "/en/v0/api/command/createBooleanOption"
next:
  text: "createArrayOption"
  link: "/en/v0/api/command/createArrayOption"
description: "Creates an option with a single parsed value from a DataParser or clean contract."
---

# createOption

Creates an option with a single parsed value from a DataParser or clean contract.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/createOption/main.ts-->
```

## Syntax

```typescript
function createOption<
  GenericName extends string,
  GenericSpec extends EligibleSpec,
  GenericOutput extends ComputeOptionSpec<GenericSpec> = ComputeOptionSpec<GenericSpec>
>(
  name: GenericName,
  spec: GenericSpec,
  params: {
    description?: string
    aliases?: readonly string[]
    required: true
  }
): Option<GenericName, GenericOutput>

function createOption<
  GenericName extends string,
  GenericSpec extends EligibleSpec,
  GenericOutput extends ComputeOptionSpec<GenericSpec> = ComputeOptionSpec<GenericSpec>
>(
  name: GenericName,
  spec: GenericSpec,
  params?: {
    description?: string
    aliases?: readonly string[]
    required?: boolean
  }
): Option<GenericName, GenericOutput | undefined>
```

## Parameters

- `name` (`string`) : option name used as `--name`.
- `spec` (`EligibleSpec`) : parser or clean spec used to validate/transform the value.
- `params` (optional) : option metadata and requirement behavior.
- `params.required` (`boolean`, optional) : throws when option is missing if its value is `true`.
- `params.description` (`string`, optional) : help description.
- `params.aliases` (`string[]`, optional) : short aliases.

## Return value

- `Option<GenericName, GenericOutput>` when `required: true`.
- `Option<GenericName, GenericOutput | undefined>` otherwise.

## Notes

- Primitive parsers and clean primitive contracts are coerced from CLI string input automatically.

## See also

- [`createBooleanOption`](/en/v0/api/command/createBooleanOption) - Builds a boolean flag option.
- [`createArrayOption`](/en/v0/api/command/createArrayOption) - Builds an array option.
- [`create`](/en/v0/api/command/create) - Builds a command using this option.
