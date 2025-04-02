const carModel = require("../models/carModel");
class CarController {
  read() {
    return carModel.read();
  }
  create(newCar) {
    return carModel.create(newCar);
  }
  update(updateCar, id) {
    return carModel.update(updateCar, id);
  }
  delete(id) {
    return carModel.delete(id);
  }
}

module.exports = new CarController();
