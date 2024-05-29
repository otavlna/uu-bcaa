const fs = require("fs");
const path = require("path");
const { uuidv7 } = require("uuidv7");

const listFolderPath = path.join(__dirname, "storage", "list");

function get(listId) {
  try {
    const filePath = path.join(listFolderPath, `${listId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadList", message: error.message };
  }
}

function create(list) {
  try {
    list.id = uuidv7();
    const filePath = path.join(listFolderPath, `${list.id}.json`);
    const fileData = JSON.stringify(list);
    fs.writeFileSync(filePath, fileData, "utf8");
    return list;
  } catch (error) {
    throw { code: "failedToCreateList", message: error.message };
  }
}

function list() {
  try {
    const files = fs.readdirSync(listFolderPath);
    const lists = files.map((file) => {
      const fileData = fs.readFileSync(path.join(listFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return lists;
  } catch (error) {
    throw { code: "failedToListLists", message: error.message };
  }
}

module.exports = {
  get,
  create,
  list,
};
