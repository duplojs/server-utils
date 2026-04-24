declare module "@duplojs/utils" {
    interface ReservedKindNamespace {
        DuplojsServerUtils: true;
    }
}
export declare const createDuplojsServerUtilsKind: <GenericName extends string, GenericKindValue extends unknown = unknown>(name: GenericName & import("@duplojs/utils/string").ForbiddenString<GenericName, "@" | "/">) => import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<`@DuplojsServerUtils/${GenericName}`, GenericKindValue>>;
