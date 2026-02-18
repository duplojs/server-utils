---
outline: [2, 3]
prev:
  text: "Command"
  link: "/en/v0/api/command/"
next:
  text: "create"
  link: "/en/v0/api/command/create"
description: "Executes a CLI command tree from runtime process arguments."
---

# exec

Executes a CLI command tree from runtime process arguments.

`exec` is the central block of the command API: it creates the implicit `root` command, reads process arguments, routes to sub-commands, parses options/subject, and triggers help rendering (`--help`) at the correct level.

## Detailed example (full command flow)

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/exec/main.ts-->
```

### What happens step by step?

1. `SC.exec(...)` builds a `root` command.
2. Runtime arguments are read (`process.argv`, `Bun.argv`, or `Deno.args`).
3. The first matching sub-command is selected when using command arrays.
4. `--help` prints help for the current level (root/command/sub-command).
5. Options are parsed in declaration order.
6. The command `subject` (if provided) is parsed with DataParser.
7. Your execute callback receives typed `{ options, subject }`.

## Other examples

### Minimal root command

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/exec/otherExample.ts-->
```

### Subject-only command

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/api/command/exec/subjectExample.ts-->
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

## See also

- [`create`](/en/v0/api/command/create) - Builds a command node.
- [`createBooleanOption`](/en/v0/api/command/createBooleanOption) - Builds a boolean flag option.
- [`createOption`](/en/v0/api/command/createOption) - Builds a single-value option.
- [`createArrayOption`](/en/v0/api/command/createArrayOption) - Builds an array option.
