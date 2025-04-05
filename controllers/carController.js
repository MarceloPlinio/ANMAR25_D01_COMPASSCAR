const carModel = require("../models/carModel");

class CarController {
  read(req, res) {
    const listCars = carModel.read();
    return listCars
      .then((cars) => res.status(200).json(cars))
      .catch((error) => res.status(400).json(error.message));
  }
  async create(req, res) {
    const errors = [];
    const newCar = req.body;
  
    // Validate brand
    if (typeof newCar.brand !== "string" || newCar.brand.trim() === "") {
      errors.push("brand is required");
    }
  
    // Validate model
    if (typeof newCar.model !== "string" || newCar.model.trim() === "") {
      errors.push("model is required");
    }
  
// Validate year
if (typeof newCar.year !== "number" || !Number.isInteger(newCar.year)) {
  errors.push("year is required");
} else if (newCar.year < 2016 || newCar.year > 2026) {
  errors.push("year must be between 2016 and 2026");
}
  
// Plate validation
if (typeof newCar.plate !== "string" || newCar.plate.trim() === "") {
  errors.push("plate is required");
} else {
  const plate = newCar.plate.toUpperCase(); 

  if (
    plate.length !== 8 ||
    plate.charAt(0) < 'A' || plate.charAt(0) > 'Z' ||
    plate.charAt(1) < 'A' || plate.charAt(1) > 'Z' ||
    plate.charAt(2) < 'A' || plate.charAt(2) > 'Z' ||
    plate.charAt(3) !== '-' ||
    isNaN(plate.charAt(4)) ||
    plate.charAt(5) < 'A' || plate.charAt(5) > 'J' ||
    isNaN(plate.charAt(6)) ||
    isNaN(plate.charAt(7))
  ) {
    errors.push("plate must be in the correct format ABC-1C34");
  } else {
    newCar.plate = plate;
    
    const existingCar = await carModel.findByPlate(plate);
    if (existingCar.length > 0) {
      errors.push("car already registered");
    }
  }
}

if (errors.length > 0) {
  const statusCode = errors.includes("car already registered") ? 409 : 400;
  return res.status(statusCode).json({ errors });
}
  
return carModel.create(newCar)
  .then((result) => {
    return carModel.findById(result.insertId); 
  })
  .then((insertedCar) => {
    return res.status(201).json(insertedCar[0]); 
  })
  .catch((error) => {
    console.error("Error inserting car:", error);
    return res.status(400).json({ errors: [error.message] });
  });
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
