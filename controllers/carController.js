const Car = require("../models/car");
const CarItem = require("../models/carItem");

class CarController {
  // GET /cars
  async read(req, res) {
    try {
      const cars = await Car.findAll();
      return res.status(200).json(cars);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // POST /cars
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

    // Validate plate
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

        const existingCar = await Car.findOne({ where: { plate } });
        if (existingCar) {
          errors.push("car already registered");
        }
      }
    }

    if (errors.length > 0) {
      const statusCode = errors.includes("car already registered") ? 409 : 400;
      return res.status(statusCode).json({ errors });
    }

    try {
      const createdCar = await Car.create(newCar);
      return res.status(201).json(createdCar);
    } catch (error) {
      console.error("Error inserting car:", error);
      return res.status(400).json({ errors: [error.message] });
    }
  }

  // PUT /cars/:id
  async update(req, res) {
    const { id } = req.params;
    const updateCar = req.body;

    try {
      const car = await Car.findByPk(id);
      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }

      await car.update(updateCar);
      return res.status(200).json(car);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // DELETE /cars/:id
  async delete(req, res) {
    const { id } = req.params;

    try {
      const car = await Car.findByPk(id);
      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }

      await car.destroy();
      return res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // GET /cars/:id
  async show(req, res) {
    const { id } = req.params;

    try {
      const car = await Car.findByPk(id, {
        include: [
          {
            model: CarItem,
            as: "carItems",
            attributes: ["name"],
          },
        ],
      });

      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }

      return res.status(200).json({
        id: car.id,
        brand: car.brand,
        model: car.model,
        plate: car.plate,
        year: car.year,
        created_at: car.created_at, 
        items: car.carItems.map((item) => item.name),
      });
    } catch (error) {
      console.error("Error fetching car:", error);
      return res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
}

module.exports = new CarController();
