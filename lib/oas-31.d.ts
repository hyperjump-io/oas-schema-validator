import type { Json, JsonType } from "@hyperjump/json-schema-core";


export type Oas31Schema = boolean | {
  $schema?: "https://spec.openapis.org/oas/3.1/dialect/base";
  $id?: string;
  $anchor?: string;
  $ref?: string;
  $dynamicRef?: string;
  $dynamicAnchor?: string;
  $vocabulary?: Record<string, boolean>;
  $comment?: string;
  $defs?: Record<string, Oas31Schema>;
  additionalItems?: Oas31Schema;
  unevaluatedItems?: Oas31Schema;
  prefixItems?: Oas31Schema[];
  items?: Oas31Schema;
  contains?: Oas31Schema;
  additionalProperties?: Oas31Schema;
  unevaluatedProperties?: Oas31Schema;
  properties?: Record<string, Oas31Schema>;
  patternProperties?: Record<string, Oas31Schema>;
  dependentSchemas?: Record<string, Oas31Schema>;
  propertyNames?: Oas31Schema;
  if?: Oas31Schema;
  then?: Oas31Schema;
  else?: Oas31Schema;
  allOf?: Oas31Schema[];
  anyOf?: Oas31Schema[];
  oneOf?: Oas31Schema[];
  not?: Oas31Schema;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxContains?: number;
  minContains?: number;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  dependentRequired?: Record<string, string[]>;
  const?: Json;
  enum?: Json[];
  type?: JsonType | JsonType[];
  title?: string;
  description?: string;
  default?: Json;
  deprecated?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  examples?: Json[];
  format?: (
    "date-time" | "date" | "time" | "duration" |
    "email" | "idn-email" |
    "hostname" | "idn-hostname" |
    "ipv4" | "ipv6" |
    "uri" | "uri-reference" | "iri" | "iri-reference" | "uuid" |
    "uri-template" |
    "json-pointer" | "relative-json-pointer" |
    "regex" |
    "int32" | "int64" | "float" | "double" | "password"
  );
  contentMediaType?: string;
  contentEncoding?: string;
  contentSchema?: Oas31Schema;
  example: Json;
  discriminator: Discriminator;
  externalDocs: ExternalDocs;
  xml: Xml;
};

export type Discriminator = {
  propertyName: string;
  mapping?: Record<string, string>;
};

export type ExternalDocs = {
  url: string;
  description?: string;
};

export type Xml = {
  name: string;
  namespace: string;
  prefix: string;
  attribute: boolean;
  wrapped: boolean;
};
