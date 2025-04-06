// models/carModel.js
const Car = require("./car");

class CarModel {
  async read() {
    return Car.findAll();
  }

  async create(newCar) {
    return Car.create(newCar);
  }

  async update(updateCar, id) {
    return Car.update(updateCar, { where: { id } });
  }

  async delete(id) {
    return Car.destroy({ where: { id } });
  }

  async findByPlate(plate) {
    return Car.findAll({ where: { plate } });
  }

  async findById(id) {
    return Car.findByPk(id);
  }
}

module.exports = new CarModel();
