# Hyperjump - OAS Schema Validator
OAS Schema Validator is built on [JSON Schema Core](https://github.com/hyperjump-io/json-schema-core).

* Supported OAS Schema Versions
  * 3.1
* Schemas can reference other schemas using a different draft
* Load schemas from filesystem (file://), network (http(s)://), or JavaScript

## Install
JSV includes support for node.js JavaScript (CommonJS and ES Modules),
TypeScript, and browsers.

### Node.js
```bash
npm install @hyperjump/oas-schema-validator
```

### Browser
When in a browser context, this package is designed to use the browser's `fetch`
implementation instead of a node.js fetch clone. The Webpack bundler does this
properly without any extra configuration, but if you are using the Rollup
bundler you will need to include the `browser: true` option in your Rollup
configuration.

```javascript
  plugins: [
    resolve({
      browser: true
    }),
    commonjs()
  ]
```

### Versioning
This project is in beta and there may be breaking changes at any time. When it's
stable enough, I'll publish v1.0.0 and follow semantic versioning from there on
out.

## Usage
```javascript
const OasSchema = require("@hyperjump/oas-schema-validator");


// Example: Inline schema
const schemaJson = {
  "$schema": "https://spec.openapis.org/oas/3.1/dialect/base",
  "$id": "http://example.com/schemas/string",
  "type": "string"
}
OasSchema.add(schemaJson);
const schema = await OasSchema.get("http://example.com/schemas/string");

// Example: Fetch from the web
const schema = await OasSchema.get("http://example.com/schemas/string");

// Example: Fetch from file
const schema = await OasSchema.get(`file://${__dirname}/schemas/string.schema.json`);

// Example: Validate instance
const output = await OasSchema.validate(schema, "foo");
if (output.valid) {
  console.log("Instance is valid :-)");
} else {
  console.log("Instance is invalid :-(");
}

// Example: Precompile validator
const isString = await OasSchema.validate(schema);
const output = isString("foo");

// Example: Validate OpenAPI document with no schema validation
const openApiSchema = await OasSchema.get("https://spec.openapis.org/oas/3.1/schema");
const validateOpenApi = await OasSchema.validate(openApiSchema);

const result = validateOpenApi(openApiDoc);
console.log("Is Valid:", result.valid);

// Example: Validate OpenAPI document with default dialect
const openApiSchema = await OasSchema.get("https://spec.openapis.org/oas/3.1/schema-base");
const validateOpenApi = await OasSchema.validate(openApiSchema);

const result = validateOpenApi(openApiDoc);
console.log("Is Valid:", result.valid);

// Example: Specify output format
const output = await OasSchema.validate(schema, "foo", OasSchema.VERBOSE);

// Example: Specify meta-validation output format
OasSchema.setMetaOutputFormat(OasSchema.FLAG);

// Example: Disable meta-validation
OasSchema.setShouldMetaValidate(false);
```

## TypeScript
Although the package is written in JavaScript, type definitions are included for
TypeScript support. The following example shows the types you might want to
know.

```typescript
import OasSchema, { InvalidSchemaError } from "@hyperjump/oas-schema-validator";
import type { SchemaDocument, Validator, Result, Oas31Schema } from "@hyperjump/json-schema";


const schemaJson: Oas31Schema = {
  "$id": "https://json-schema.hyperjump.io/schema",
  "$schema": "https://spec.openapis.org/oas/3.1/dialect/base",

  "type": "string"
};
OasSchema.add(schemaJson);

const schema: SchemaDocument = await OasSchema.get("https://json-schema.hyperjump.io/schema");
try {
  const isString: Validator = await OasSchema.validate(schema);
  const result: Result = isString("foo");
  console.log("isString:", result.valid);
} catch (error: unknown) {
  if (error instanceof InvalidSchemaError) {
    console.log(error.output);
  } else {
    console.log(error);
  }
}
```

## API
* **add**: (schema: object, url?: URI, dialectId?: string) => SDoc

    Load a schema. See [JSC - $id](https://github.com/hyperjump-io/json-schema-core#id)
    and [JSC - $schema](https://github.com/hyperjump-io/json-schema-core#schema-1)
    for more information.
* **get**: (url: URI, contextDoc?: SDoc, recursive: boolean = false) => Promise<SDoc>

    Fetch a schema. Schemas can come from an HTTP request, a file, or a schema
    that was added with `add`.
* **validate**: (schema: SDoc, instance: any, outputFormat: OutputFormat = FLAG) => Promise<OutputUnit>

    Validate an instance against a schema. The function is curried to allow
    compiling the schema once and applying it to multiple instances.
* **compile**: (schema: SDoc) => Promise<CompiledSchema>

    Compile a schema to be interpreted later. A compiled schema is a JSON
    serializable structure that can be serialized an restored for later use.
* **interpret**: (schema: CompiledSchema, instance: any, outputFormat: OutputFormat = FLAG) => OutputUnit

    A curried function for validating an instance against a compiled schema.
* **setMetaOutputFormat**: (outputFormat: OutputFormat = DETAILED) => undefined

    Set the output format for meta-validation. Meta-validation output is only
    returned if meta-validation results in an error.
* **setShouldMetaValidate**: (isEnabled: boolean) => undefined

    Enable or disable meta-validation.
* **OutputFormat**: [**FLAG** | **BASIC** | **DETAILED** | **VERBOSE**]

    See [JSC - Output](https://github.com/hyperjump-io/json-schema-core#output)
    for more information on output formats.

## Not (yet) Supported
This implementation supports all required features of OAS 3.1 Schema Object. The
following optional features are not supported yet.

* The format-assertion vocabulary

## Contributing

### Tests

Run the tests

```bash
npm test
```

Run the tests with a continuous test runner

```bash
npm test -- --watch
```
