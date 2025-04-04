const carModel = require("../models/carModel");
class CarController {
  read(req, res) {
    const listCars = carModel.read();
    return listCars
      .then((cars) => res.status(200).json(cars))
      .catch((error) => res.status(400).json(error.message));
  }
  create(req, res) {
    const newCar = req.body;
    const car = carModel.create(newCar);
    return car
      .then((carCreate) => res.status(201).json(carCreate))
      .catch((error) => res.status(400).json(error.message));
  }
  update(req, res) {
    const { id } = req.params;
    const updateCar = req.body;
    const car = carModel.update(updateCar, id);
    return car
      .then((resultUpdateCar) => res.status(200).json(resultUpdateCar))
      .catch((error) => res.status(400).json(error.message));
  }
  delete(req, res) {
    const { id } = req.params;
    const car = carModel.delete(id);
    return car
      .then((resultDeletedCar) => res.status(200).json(resultDeletedCar))
      .catch((error) => res.status(400).json(error.message));
  }
}

module.exports = new CarController();
