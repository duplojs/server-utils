declare module "@duplojs/utils" {
    interface ReservedKindNamespace {
        DuplojsServerUtilsDataParser: true;
    }
}
export declare const createDataParserKind: <GenericName extends string, GenericKindValue extends unknown = unknown>(name: GenericName & import("@duplojs/utils/string").ForbiddenString<GenericName, "@" | "/">) => import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<`@DuplojsServerUtilsDataParser/${GenericName}`, GenericKindValue>>;
