const router = require("express").Router();
const roomController = require("../controllers/room/roomController");

router.get("/", roomController.controllers.createRoom);

module.exports = router;
