const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
const todoStatus = require("./todoStatus.js");
addFormats(ajv);

const todoDao = require("../../dao/todo-dao.js");

const schema = {
  type: "object",
  properties: {
    listId: { type: "string" },
    todoId: { type: "string" },
  },
  required: ["listId", "todoId"],
  additionalProperties: false,
};

async function DeleteAbl(req, res) {
  try {
    let body = req.body;

    // validate input
    const valid = ajv.validate(schema, body);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    todoDao.deleteTodo(body.listId, body.todoId);

    res.status(204).end();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;
