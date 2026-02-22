---
outline: [2, 3]
prev:
  text: "Command"
  link: "/en/v0/api/command/"
next:
  text: "create"
  link: "/en/v0/api/command/create"
description: "Runs a CLI command from runtime arguments."
---

# exec

`exec` runs your CLI.
It reads runtime arguments, picks the right command, then runs your callback.
If the user passes `--help`, the matching help output is shown automatically.

## Example

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/exec/main.ts-->
```

## Syntax

```typescript
function exec(
  execute: () => void
): Promise<void>

function exec<
  GenericOptions extends readonly Option[],
  GenericSubject extends Subject
>(
  params: CreateCommandParams<GenericOptions, GenericSubject>,
  execute: (
    params: CreateCommandExecuteParams<GenericOptions, GenericSubject>
  ) => MaybePromise<void>
): Promise<void>
```

## Parameters

- `execute` : root handler called when no `params` object is provided.
- `params` (`CreateCommandParams`) : command configuration for root.
- `params.description` (`string`, optional) : displayed in help output.
- `params.options` (`Option[]`, optional) : option definitions parsed before execute.
- `params.subject` (`Subject | Command[]`, optional) : DataParser subject or sub-command list.
- `execute` (overload 2) : receives typed `options` and optional typed `subject`.

## Return value

- `Promise<void>` : resolves after command dispatch and execution complete.

## Other examples

### Minimal root command

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/exec/otherExample.ts-->
```

### Advanced

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/exec/advanced.ts-->
```

## See also

- [`create`](/en/v0/api/command/create) - Builds a command node.
- [`createBooleanOption`](/en/v0/api/command/createBooleanOption) - Builds a boolean flag option.
- [`createOption`](/en/v0/api/command/createOption) - Builds a single-value option.
- [`createArrayOption`](/en/v0/api/command/createArrayOption) - Builds an array option.
