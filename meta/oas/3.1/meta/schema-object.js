module.exports = `{
    "$id": "https://spec.openapis.org/oas/3.1/meta/schema-object",
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "$vocabulary": {
        "https://json-schema.org/draft/2019-09/vocab/core": true,
        "https://json-schema.org/draft/2019-09/vocab/applicator": true,
        "https://json-schema.org/draft/2019-09/vocab/validation": true,
        "https://json-schema.org/draft/2019-09/vocab/meta-data": true,
        "https://json-schema.org/draft/2019-09/vocab/format": false,
        "https://json-schema.org/draft/2019-09/vocab/content": true,
        "https://spec.openapis.org/oas/3.1/vocab/extensions": true
    },
    "$recursiveAnchor": true,

    "title": "Core and Validation specifications meta-schema",
    "allOf": [
        { "$ref": "https://json-schema.org/draft/2019-09/schema" },
        { "$ref": "https://spec.openapis.org/oas/3.1/meta/extensions" }
    ],
    "type": ["object", "boolean"],
    "unevaluatedProperties": false
}`;
