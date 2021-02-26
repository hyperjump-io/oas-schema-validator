# Hyperjump - OAS Schema Validator
OAS Schema Validator is built on [JSON Schema Core](https://github.com/hyperjump-io/json-schema-core).

* Supported OAS Schema Versions
  * 3.1
* Schemas can reference other schemas using a different draft
* Load schemas from filesystem (file://), network (http(s)://), or JavaScript

## Install
The package is designed to run in a vanilla node.js environment, but has no
dependencies on node.js specific libraries so it can be bundled for the browser.
No compilers, preprocessors, or bundlers are used.

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
const schema = await OasSchema.get("file:///path/to/my/schemas/string.schema.json");

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

// Example: Specify output format
const output = await OasSchema.validate(schema, "foo", OasSchema.VERBOSE);

// Example: Specify meta-validation output format
OasSchema.setMetaOutputFormat(OasSchema.FLAG);

// Example: Disable meta-validation
OasSchema.setShouldMetaValidate(false);
```

## API
* **add**: (schema: object, url?: URI, schemaVersion?: string) => undefined

    Load a schema. See [JSC - $id](https://github.com/hyperjump-io/json-schema-core#id)
    and [JSC - $schema](https://github.com/hyperjump-io/json-schema-core#schema-1)
    for more information.
* **get**: (url: URI, contextDoc?: SDoc, recursive: boolean = false) => Promise<SDoc>

    Fetch a schema. Schemas can come from an HTTP request, a file, or a schema
    that was added with `add`.
* **validate**: (schema: SDoc, instance: any, outputFormat: OutputFormat = FLAG) => OutputUnit

    Validate an instance against a schema. The function is curried to allow
    compiling the schema once and applying it to multiple instances.
* **setMetaOutputFormat**: (outputFormat: OutputFormat = DETAILED) => undefined

    Set the output format for meta-validation. Meta-validation output is only
    returned if meta-validation results in an error.
* **setShouldMetaValidate**: (isEnabled: boolean) => undefined

    Enable or disable meta-validation.
* **OutputFormat**: [**FLAG** | **BASIC** | **DETAILED** | **VERBOSE**]

    [JSC - Output](https://github.com/hyperjump-io/json-schema-core#output) for
    more information on output formats.

## Not (yet) Supported
This implementation supports all required features of JSON Schema draft 2020-12.
The following optional features are not supported yet.

* The format vocabulary

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
