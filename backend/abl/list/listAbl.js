const listDao = require("../../dao/list-dao.js");

async function ListAbl(req, res) {
  try {
    const lists = listDao.list();

    res.json(lists);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
