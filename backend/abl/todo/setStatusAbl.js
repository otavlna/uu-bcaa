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
    status: { type: "string", enum: Object.values(todoStatus) },
  },
  required: ["listId", "todoId", "status"],
  additionalProperties: false,
};

async function SetStatusAbl(req, res) {
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

    const todo = todoDao.setStatus(body.listId, body.todoId, body.status);

    res.json(todo);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = SetStatusAbl;
