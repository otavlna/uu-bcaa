const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
const todoStatus = require("./todoStatus.js");
addFormats(ajv);

const todoDao = require("../../dao/todo-dao.js");

const schema = {
  type: "object",
  properties: {
    content: { type: "string", minLength: 3 },
    listId: { type: "string" },
  },
  required: ["content", "listId"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let todo = req.body;

    // validate input
    const valid = ajv.validate(schema, todo);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    todo.status = todoStatus.TO_DO;

    todo = todoDao.create(todo);

    res.json(todo);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
