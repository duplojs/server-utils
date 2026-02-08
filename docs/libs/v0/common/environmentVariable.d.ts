import { type DP, E } from "@duplojs/utils";
interface EnvironmentVariableParams {
    paths?: string[];
    /**
     * @default false
     */
    override: boolean;
    /**
     * @default false
     */
    justRead: boolean;
}
declare module "../implementor" {
    interface ServerUtilsFunction {
        environmentVariable<GenericSchema extends DP.DataParserObject>(schema: GenericSchema, params?: EnvironmentVariableParams): Promise<E.Success<DP.Output<GenericSchema>> | E.Left<"environment-variable-error", unknown>>;
    }
}
export declare const environmentVariable: <GenericSchema extends DP.DataParserObject>(schema: GenericSchema, params?: EnvironmentVariableParams) => Promise<E.Success<DP.Output<GenericSchema>> | E.Left<"environment-variable-error", unknown>>;
export {};
