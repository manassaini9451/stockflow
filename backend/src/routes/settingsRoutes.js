const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/settingsController");

router.get("/", auth, ctrl.getSettings);
router.put("/", auth, ctrl.updateSettings);

module.exports = router;