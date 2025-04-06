const { Router } = require("express");
const router = Router();
const carController = require("../controllers/carController");
const carItemController = require("../controllers/carItemController");

// GET
router.get("/cars", carController.read);

// GET ID
router.get("/cars/:id", carController.show);

// POST
router.post("/cars", carController.create);

// PUT
router.put("/cars/:id", carController.update);

// DELETE
router.delete("/cars/:id", carController.delete);

// PUT ID
router.put("/cars/:id/items", carItemController.updateItems);

module.exports = router;
