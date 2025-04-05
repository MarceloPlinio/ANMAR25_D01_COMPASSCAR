const { Router } = require("express");
const router = Router();
const carController = require("../controllers/carController");

// GET
router.get("/cars", carController.read);

// POST
router.post("/cars", carController.create);

// PUT
router.put("/cars/:id", carController.update);

// DELETE
router.delete("/cars/:id", carController.delete);

module.exports = router;
