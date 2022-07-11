const { Core, Keywords, Schema } = require("@hyperjump/json-schema-core");
const dialectSchema = require("../meta/oas/3.1/dialect/base");
const vocabularySchema = require("../meta/oas/3.1/meta/base");
const schema20220227 = require("../meta/oas/3.1/schema/2022-02-27");
const schemaBase20220227 = require("../meta/oas/3.1/schema/2022-02-27");
const schema20210928 = require("../meta/oas/3.1/schema/2021-09-28");
const schemaBase20210928 = require("../meta/oas/3.1/schema/2021-09-28");


Schema.add(JSON.parse(schema20220227), "https://spec.openapis.org/oas/3.1/schema");
Schema.add(JSON.parse(schema20220227), "https://spec.openapis.org/oas/3.1/schema/latest");
Schema.add(JSON.parse(schemaBase20220227), "https://spec.openapis.org/oas/3.1/schema-base");
Schema.add(JSON.parse(schemaBase20220227), "https://spec.openapis.org/oas/3.1/schema-base/latest");

Schema.add(JSON.parse(schema20220227), "https://spec.openapis.org/oas/3.1/schema/2022-02-27");
Schema.add(JSON.parse(schemaBase20220227), "https://spec.openapis.org/oas/3.1/schema-base/2022-02-27");
Schema.add(JSON.parse(schema20210928), "https://spec.openapis.org/oas/3.1/schema/2021-09-28");
Schema.add(JSON.parse(schemaBase20210928), "https://spec.openapis.org/oas/3.1/schema-base/2021-09-28");

Schema.add(JSON.parse(dialectSchema));

Schema.add(JSON.parse(vocabularySchema));
Core.defineVocabulary("https://spec.openapis.org/oas/3.1/vocab/extensions", {
  "example": Keywords.metaData,
  "discriminator": Keywords.metaData,
  "externalDocs": Keywords.metaData,
  "xml": Keywords.metaData
});
