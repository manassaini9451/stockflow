const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/productController");

router.post("/", auth, ctrl.createProduct);
router.get("/", auth, ctrl.getProducts);
router.put("/:id", auth, ctrl.updateProduct);
router.delete("/:id", auth, ctrl.deleteProduct);

router.get("/dashboard/summary", auth, ctrl.dashboard);

module.exports = router;