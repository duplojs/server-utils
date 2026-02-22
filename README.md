# @duplojs/server-utils
[![NPM version](https://img.shields.io/npm/v/@duplojs/server-utils)](https://www.npmjs.com/package/@duplojs/server-utils)

Typed, runtime-agnostic server helpers for file systems, CLI commands, and common system operations in the DuploJS ecosystem.

## Documentation

- https://server-utils.duplojs.dev

## Why

- Consistent APIs across Node.js, Deno, and Bun
- Explicit result types (Ok/Success/Left) for clear error handling
- Small, focused utilities you can import individually
- CLI command builder with typed options and subjects
- `environmentVariable`: dotenv + dotenv-expand in one typed API, with schema validation

## Install

```bash
npm install @duplojs/server-utils@0 @duplojs/utils@1
```

## What’s inside

- File system utilities: read/write/append, directories, links, copy/move/remove
- CLI command utilities: `exec`, `create`, and option builders
- Environment variable utilities
