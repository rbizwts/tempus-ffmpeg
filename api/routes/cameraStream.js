const express = require("express");
const router = express.Router();
const cameraStream = require("../controllers/cameraStreamController");

router.post("/start-record", cameraStream.cutStream);
router.post("/stop-record", cameraStream.endCamStream);

module.exports = router;