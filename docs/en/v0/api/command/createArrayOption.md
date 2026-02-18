---
outline: [2, 3]
prev:
  text: "createOption"
  link: "/en/v0/api/command/createOption"
next:
  text: "API Reference"
  link: "/en/v0/api/"
description: "Creates an option that parses a delimited list into a typed array."
---

# createArrayOption

Creates an option that parses a delimited list into a typed array.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/createArrayOption/main.ts-->
```

## Syntax

```typescript
function createArrayOption<
  GenericName extends string,
  GenericSchema extends EligibleDataParser,
  GenericMinValues extends number
>(
  name: GenericName,
  schema: GenericSchema,
  params: {
    description?: string
    aliases?: readonly string[]
    min?: GenericMinValues
    max?: number
    required: true
    separator?: string
  }
): Option<
  GenericName,
  [
    ...A.CreateTuple<DP.Output<GenericSchema>, GenericMinValues>,
    ...DP.Output<GenericSchema>[]
  ]
>

function createArrayOption<
  GenericName extends string,
  GenericSchema extends EligibleDataParser,
  GenericMinValues extends number
>(
  name: GenericName,
  schema: GenericSchema,
  params?: {
    description?: string
    aliases?: readonly string[]
    min?: GenericMinValues
    max?: number
    separator?: string
  }
): Option<
  GenericName,
  | [
      ...A.CreateTuple<DP.Output<GenericSchema>, GenericMinValues>,
      ...DP.Output<GenericSchema>[]
    ]
  | undefined
>
```

## Parameters

- `name` (`string`) : option name used as `--name`.
- `schema` (`EligibleDataParser`) : parser for each array element.
- `params` (optional) : option metadata and array constraints.
- `params.required` (`true`, optional) : throws when option is missing.
- `params.min` (`number`, optional) : minimum number of values.
- `params.max` (`number`, optional) : maximum number of values.
- `params.separator` (`string`, default `","`) : input separator.
- `params.description` (`string`, optional) : help description.
- `params.aliases` (`string[]`, optional) : short aliases.

## Return value

- Required mode: `Option<GenericName, [..items]>`.
- Optional mode: `Option<GenericName, [..items] | undefined>`.

## See also

- [`createOption`](/en/v0/api/command/createOption) - Builds a single-value option.
- [`createBooleanOption`](/en/v0/api/command/createBooleanOption) - Builds a boolean flag option.
- [`create`](/en/v0/api/command/create) - Builds a command using this option.
