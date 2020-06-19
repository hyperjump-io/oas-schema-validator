const { Core, Schema } = require("@hyperjump/json-schema-core");
const keywords = require("@hyperjump/json-schema/lib/keywords");
const metaSchema = require("../meta/oas/3.1/meta/schema-object");
const extensionsMetaSchema = require("../meta/oas/3.1/meta/extensions");


Schema.add(JSON.parse(metaSchema));

Schema.add(JSON.parse(extensionsMetaSchema));
Core.defineVocabulary("https://spec.openapis.org/oas/3.1/vocab/extensions", {
  "discriminator": keywords.metaData,
  "example": keywords.metaData,
  "externalDocs": keywords.metaData,
  "xml": keywords.metaData
});
