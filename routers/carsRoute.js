const { Router } = require("express");
const router = Router();
const carController = require("../controllers/carController");
const carItemController = require("../controllers/carItemController");

// GET
router.get("/cars", carController.read);

// POST
router.post("/cars", carController.create);

// PUT
router.put("/cars/:id", carController.update);

router.put("/cars/:id/items", carItemController.updateItems);

// DELETE
router.delete("/cars/:id", carController.delete);

module.exports = router;
