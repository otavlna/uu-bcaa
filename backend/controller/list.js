const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/list/createAbl");
const GetAbl = require("../abl/list/getAbl");
const ListAbl = require("../abl/list/listAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);

module.exports = router;
