const express = require("express");
const router = express.Router();
const feedController = require("../controllers/FeedStockController");
const { protected, isAdmin } = require("../middleware/authMiddleware");

router.get("/getAllFeedStocks", protected, feedController.getFeedstock);
router.post("/addFeedStock", protected, feedController.addFeedStock);

module.exports = router;
