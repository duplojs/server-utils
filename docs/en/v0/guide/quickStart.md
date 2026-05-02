---
description: "Discover the main @duplojs/server-utils features and when to use them."
prev:
  text: "Introduction"
  link: "/en/v0/guide/"
next:
  text: "Create a command"
  link: "/en/v0/guide/command"
---

# Getting Started

## Installation

`@duplojs/server-utils` is used with `@duplojs/utils`, which provides `Either` and `DataParser`.

::: code-group
```bash [npm]
npm install @duplojs/server-utils@0 @duplojs/utils@1
```
```bash [yarn]
yarn add @duplojs/server-utils@0 @duplojs/utils@1
```
```bash [pnpm]
pnpm add @duplojs/server-utils@0 @duplojs/utils@1
```
```bash [bun]
bun add @duplojs/server-utils@0 @duplojs/utils@1
```
```bash [deno]
deno add npm:@duplojs/server-utils@0 npm:@duplojs/utils@1
```
:::

The library is designed to unify usage across modern server runtimes: Node, Bun, and Deno. With the same API, you keep the same application behavior even when the runtime changes.

## File

The `file` namespace covers filesystem operations without locking you into one runtime-specific API.

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/guide/quickStart/file.ts-->
```

Use it to read or write files, manipulate JSON, create temporary folders, walk a directory tree, or move resources.

The `fileInterface`, `folderInterface`, and `unknownInterface` helpers represent a resource as something richer than its `path`. You start from a path, identify it as a file, folder, or unknown resource, then manipulate that representation through consistent methods. This is useful when a resource should move through your code as a domain object instead of a plain string.

## Common

The `common` namespace groups runtime helpers. For applications, the most important one is often `environmentVariable`: it loads variables from the process and env files, expands references, then validates the result with `DataParser`.

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/guide/quickStart/environmentVariable.ts-->
```

This replaces blind `.env` loading with a real validation boundary. Invalid variables are caught at startup, types are known in code, and env files remain optional depending on your strategy.

## Command

The `command` namespace builds typed CLIs. You declare options, positional arguments, and subcommands; the library reads process arguments, generates help, and turns parsing errors into readable messages.

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/guide/quickStart/command.ts-->
```

For a script that only needs options, `execOptions` is the lightweight version: typed parsing and automatic help without building a full command.

## API

Guides give context and a reading path. For complete signatures, use the reference namespaces:

- [`Common`](/en/v0/api/common/) for runtime helpers and environment variables;
- [`File`](/en/v0/api/file/) for filesystem work;
- [`Command`](/en/v0/api/command/) for CLIs;
- [`DataParser`](/en/v0/api/dataParser/) for server parsers.
