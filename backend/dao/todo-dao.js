const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const listFolderPath = path.join(__dirname, "storage", "list");

function create(todo) {
  try {
    const list = readList(todo.listId);
    todo = {
      id: crypto.randomBytes(16).toString("hex"),
      content: todo.content,
      status: todo.status,
    };
    list.todos.push(todo);
    writeList(list);
    return todo;
  } catch (error) {
    throw { code: "failedToCreateList", message: error.message };
  }
}

function setStatus(listId, todoId, status) {
  try {
    const list = readList(listId);
    const index = list.todos.findIndex((todo) => todo.id === todoId);
    if (index === -1) {
      throw { code: "todoNotFound", message: "Todo not found" };
    }
    list.todos[index].status = status;
    writeList(list);
  } catch (error) {
    throw { code: "failedToSetStatus", message: error.message };
  }
}

function deleteTodo(listId, todoId) {
  try {
    const list = readList(listId);
    const index = list.todos.findIndex((todo) => todo.id === todoId);
    if (index === -1) {
      throw { code: "todoNotFound", message: "Todo not found" };
    }
    list.todos.splice(index, 1);
    writeList(list);
  } catch (error) {
    throw { code: "failedToDelete", message: error.message };
  }
}

function readList(listId) {
  const filePath = path.join(listFolderPath, `${listId}.json`);
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    throw { code: "invalidList", message: error.message };
  }
}

function writeList(list) {
  const filePath = path.join(listFolderPath, `${list.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(list), "utf8");
}

module.exports = {
  create,
  setStatus,
  deleteTodo,
};
