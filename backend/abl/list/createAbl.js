const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const listDao = require("../../dao/list-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3 },
  },
  required: ["name"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let list = req.body;

    // validate input
    const valid = ajv.validate(schema, list);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    list.todos = [];

    list = listDao.create(list);
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
