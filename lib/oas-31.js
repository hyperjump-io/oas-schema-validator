const { Core, Keywords, Schema } = require("@hyperjump/json-schema-core");
const dialectSchema = require("../meta/oas/3.1/dialect/base");
const vocabularySchema = require("../meta/oas/3.1/meta/base");


Schema.add(JSON.parse(dialectSchema));

Schema.add(JSON.parse(vocabularySchema));
Core.defineVocabulary("https://spec.openapis.org/oas/3.1/vocab/extensions", {
  "example": Keywords.metaData,
  "discriminator": Keywords.metaData,
  "externalDocs": Keywords.metaData,
  "xml": Keywords.metaData
});
