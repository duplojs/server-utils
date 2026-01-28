# @duplojs/server-utils
[![NPM version](https://img.shields.io/npm/v/@duplojs/server-utils)](https://www.npmjs.com/package/@duplojs/server-utils)

Typed, runtime-agnostic server helpers for file systems, paths, and common system operations in the DuploJS ecosystem.

## Documentation

- https://server-utils.duplojs.dev

## Why

- Consistent APIs across Node.js, Deno, and Bun
- Explicit result types (Ok/Success/Left) for clear error handling
- Small, focused utilities you can import individually

## Install

```bash
npm install @duplojs/server-utils @duplojs/utils
```

## Quick start

```ts
import { SF } from "@duplojs/server-utils";
import { E, unwrap } from "@duplojs/utils";

const result = await SF.readTextFile("/tmp/example.txt");

if (E.isRight(result)) {
  const content = unwrap(result);
  // content: string
}
```

## What’s inside

- File system utilities: read/write/append, directories, links, copy/move/remove
- JSON helpers
- Temporary files and directories
- MIME type helpers and file/folder interfaces