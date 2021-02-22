const { Core, Schema } = require("@hyperjump/json-schema-core");

require("@hyperjump/json-schema/lib/draft-2020-12");
require("./oas-31.js");


module.exports = {
  add: Core.add,
  get: Schema.get,
  validate: Core.validate,
  setMetaOutputFormat: Core.setMetaOutputFormat,
  setShouldMetaValidate: Core.setShouldMetaValidate,
  FLAG: Core.FLAG,
  BASIC: Core.BASIC,
  DETAILED: Core.DETAILED,
  VERBOSE: Core.VERBOSE
};
