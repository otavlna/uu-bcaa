const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/todo/createAbl");
const SetStatusAbl = require("../abl/todo/setStatusAbl");
const DeleteAbl = require("../abl/todo/deleteAbl");

router.post("/create", CreateAbl);
router.put("/setStatus", SetStatusAbl);
router.delete("/delete", DeleteAbl);

module.exports = router;
