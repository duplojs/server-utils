import type { E } from "@duplojs/utils";
export type FileSystemLeft<GenericName extends string> = E.Left<`file-system-${GenericName}`, unknown>;
