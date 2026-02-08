---
outline: [2, 3]
description: "Functions to build, compose, and run immutable validators. ServerDataParser. or SDP. describes the expected shape of data, returns an Either (parse / asyncParse), and produces structured errors ready to be serialized."
prev:
  text: "File"
  link: "/en/v0/api/file/"
next:
  text: "API Reference"
  link: "/en/v0/api/"
---

# Data Parser

Functions to build, compose, and run immutable validators. `DServerDataParser.*` or `SDP.*` describes the expected shape of data, returns an `Either` (`parse` / `asyncParse`), and produces structured errors ready to be serialized.

## How to import?

The library exposes the `DServerDataParser`, `DServerDataParserCoerce`, and `DServerDataParserExtended` namespaces from the main entry point **or** through direct imports (tree-shaking friendly).

```typescript
// ServerDataParser
import { DServerDataParser, SDP } from "@duplojs/utils";
import * as DServerDataParser from "@duplojs/utils/dataParser";
import * as SDP from "@duplojs/utils/dataParser";

// ServerDataParserCoerce
import { DServerDataParserCoerce, SDPC } from "@duplojs/utils";
import * as DServerDataParserCoerce from "@duplojs/utils/dataParserCoerce";
import * as SDPC from "@duplojs/utils/dataParserCoerce";

// ServerDataParserExtended
import { DServerDataParserExtended, SDPE } from "@duplojs/utils";
import * as DServerDataParserExtended from "@duplojs/utils/dataParserExtended";
import * as SDPE from "@duplojs/utils/dataParserExtended";
```

## File parsers

### [file](/en/v0/api/dataParser/file)
Validates `FileInterface`, with constraints on file size and mime type. Supports coercion from a path.
