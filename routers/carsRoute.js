const { Router } = require("express");
const router = Router();
const carController = require("../controllers/carController");
const { read } = require("../models/carModel");

//crud

// GET
router.get("/cars", (req, res) => {
  const listCars = carController.read();
  listCars
    .then((cars) => res.status(200).json(cars))
    .catch((error) => res.status(400).json(error.message));
});

// POST
router.post("/cars", (req, res) => {
  const newCar = req.body;
  const car = carController.create(newCar);
  car
    .then((carCreate) => res.status(201).json(carCreate))
    .catch((error) => res.status(400).json(error.message));
});

// PUT
router.put("/cars/:id", (req, res) => {
  const { id } = req.params;
  const updateCar = req.body;
  const car = carController.update(updateCar, id);
  car
    .then((resultUpdateCar) => res.status(200).json(resultUpdateCar))
    .catch((error) => res.status(400).json(error.message));
});

// DELETE
router.delete("/cars/:id", (req, res) => {
  const { id } = req.params;
  const car = carController.delete(id);
  car
    .then((resultDeletedCar) => res.status(200).json(resultDeletedCar))
    .catch((error) => res.status(400).json(error.message));
});

module.exports = router;
