import type { JsonSchema } from "@hyperjump/json-schema";


export type OasSchema = JsonSchema;
export * from "@hyperjump/json-schema";
export * from "./oas-31";

declare const oasSchema: JsonSchema;
export default oasSchema;
