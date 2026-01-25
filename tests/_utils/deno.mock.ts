interface DenoMock {
	cwd?(): string;
	chdir?(path: string | URL): void;
	readFile?(path: string | URL): Promise<Uint8Array>;
	readTextFile?(path: string | URL): Promise<string>;
	writeFile?(path: string | URL, data: Uint8Array, options?: { append?: boolean }): Promise<void>;
	writeTextFile?(path: string | URL, data: string, options?: { append?: boolean }): Promise<void>;
	mkdir?(path: string | URL, options?: { recursive?: boolean }): Promise<void>;
	remove?(path: string | URL, options?: { recursive?: boolean }): Promise<void>;
	rename?(fromPath: string | URL, toPath: string | URL): Promise<void>;
	truncate?(path: string, size?: number): Promise<void>;
	chmod?(path: string | URL, mode: number): Promise<void>;
	chown?(path: string | URL, userId: number, groupId: number): Promise<void>;
	utime?(path: string | URL, accessTime: number, modifiedTime: number): Promise<void>;
	symlink?(oldPath: string | URL, newPath: string | URL, params?: { type?: "file" | "dir" | "junction" }): Promise<void>;
	readLink?(path: string | URL): Promise<string>;
	link?(existingPath: string | URL, newPath: string | URL): Promise<void>;
	makeTempDir?(options?: { prefix?: string }): Promise<string>;
	makeTempFile?(options?: {
		prefix?: string;
		suffix?: string;
	}): Promise<string>;
	stat?(path: string | URL): Promise<unknown>;
	lstat?(path: string | URL): Promise<unknown>;
	realPath?(path: string | URL): Promise<string>;
	open?(path: string | URL, options?: {
		write?: boolean;
		create?: boolean;
		append?: boolean;
	}): Promise<{ close(): void }>;
}

const globalWithDeno = globalThis as unknown as { Deno?: DenoMock };

export function setDenoMock(mock: DenoMock) {
	globalWithDeno.Deno = mock;
}
