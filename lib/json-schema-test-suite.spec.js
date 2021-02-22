const fs = require("fs");
const OasSchema = require("./index");
const { expect } = require("chai");


const testSuitePath = "./node_modules/json-schema-test-suite";

const addRemotes = (schemaVersion, filePath = `${testSuitePath}/remotes`, url = "") => {
  return fs.readdirSync(filePath, { withFileTypes: true })
    .forEach((entry) => {
      if (entry.isFile()) {
        const remote = JSON.parse(fs.readFileSync(`${filePath}/${entry.name}`, "utf8"));
        OasSchema.add(remote, `http://localhost:1234${url}/${entry.name}`, schemaVersion);
      } else if (entry.isDirectory()) {
        addRemotes(schemaVersion, `${filePath}/${entry.name}`, `${url}/${entry.name}`);
      }
    });
};

OasSchema.setMetaOutputFormat(OasSchema.FLAG);
//OasSchema.setShouldMetaValidate(false);

const runTestSuite = (draft, schemaVersion) => {
  const testSuiteFilePath = `${testSuitePath}/tests/${draft}`;

  describe(`${draft} ${schemaVersion}`, () => {
    before(() => {
      addRemotes(schemaVersion);
    });

    fs.readdirSync(testSuiteFilePath, { withFileTypes: true })
      .filter((entry) => entry.isFile() && /\.json$/.test(entry.name))
      .forEach((entry) => {
        const file = `${testSuiteFilePath}/${entry.name}`;

        describe(entry.name, () => {
          const suites = JSON.parse(fs.readFileSync(file, "utf8"));

          suites.forEach((suite) => {
            describe(suite.description, () => {
              let validate;

              before(async () => {
                const path = "/" + suite.description.replace(/\s+/g, "-");
                const url = `http://${draft}-test-suite.json-schema.org${path}`;
                OasSchema.add(suite.schema, url, schemaVersion);

                const schema = await OasSchema.get(url);
                validate = await OasSchema.validate(schema);
              });

              suite.tests.forEach((test) => {
                it(test.description, () => {
                  const output = validate(test.data);
                  expect(output.valid).to.equal(test.valid);
                });
              });
            });
          });
        });
      });
  });
};

runTestSuite("draft2019-09", "https://spec.openapis.org/oas/3.1/dialect/base");
