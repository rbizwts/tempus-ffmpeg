const express = require("express");
const router = express.Router();

router.use('/cameraStream', require('./routes/cameraStream'));

module.exports = router;
