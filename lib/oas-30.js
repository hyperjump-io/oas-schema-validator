const { Schema } = require("@hyperjump/json-schema-core");
const schema = require("../meta/oas/3.0/schema/2021-09-28");


Schema.add(JSON.parse(schema), "https://spec.openapis.org/oas/3.0/schema");
Schema.add(JSON.parse(schema), "https://spec.openapis.org/oas/3.0/schema/latest");
