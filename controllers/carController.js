const Car = require("../models/car");
const CarItem = require("../models/carItem");
const {
  isValidPlate,
  normalizePlate,
  validateYear,
  validateBrand,
  validateModel,
  isPlateDuplicate,
  validatePatchCarData,
} = require("../utils/validator");
const { Op } = require("sequelize");

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
    const newCar = req.body;
    const errors = [];

    const brandError = validateBrand(newCar.brand);
    if (brandError) errors.push(brandError);

    const modelError = validateModel(newCar.model);
    if (modelError) errors.push(modelError);

    const yearError = validateYear(newCar.year);
    if (yearError) errors.push(yearError);

    if (!newCar.plate || typeof newCar.plate !== "string" || newCar.plate.trim() === "") {
      errors.push("plate is required");
    } else {
      const plate = normalizePlate(newCar.plate);
      if (!isValidPlate(plate)) {
        errors.push("plate must be in the correct format ABC-1C34");
      } else {
        newCar.plate = plate;
        const plateExists = await isPlateDuplicate(plate);
        if (plateExists) {
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
      if (!car) return res.status(404).json({ error: "Car not found" });

      await car.update(updateCar);
      return res.status(200).json(car);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // PATCH /cars/:id
  async patch(req, res) {
    const { id } = req.params;
    const updates = req.body;
    const errors = [];

    try {
      const car = await Car.findByPk(id);
      if (!car) return res.status(404).json({ error: "Car not found" });

      if (updates.brand !== undefined) {
        const err = validateBrand(updates.brand);
        if (err) errors.push(err);
      }

      if (updates.model !== undefined) {
        const err = validateModel(updates.model);
        if (err) errors.push(err);
      }

      if (updates.year !== undefined) {
        const err = validateYear(updates.year);
        if (err) errors.push(err);
      }

      if (updates.plate !== undefined) {
        if (typeof updates.plate !== "string" || updates.plate.trim() === "") {
          errors.push("plate is required");
        } else {
          const plate = normalizePlate(updates.plate);
          if (!isValidPlate(plate)) {
            errors.push("plate must be in the correct format ABC-1C34");
          } else {
            updates.plate = plate;
            const plateExists = await isPlateDuplicate(plate, id);
            if (plateExists) {
              errors.push("car already registered");
            }
          }
        }
      }

      if (errors.length > 0) {
        const statusCode = errors.includes("car already registered") ? 409 : 400;
        return res.status(statusCode).json({ errors });
      }

      await car.update(updates);
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
      if (!car) return res.status(404).json({ error: "Car not found" });

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

      if (!car) return res.status(404).json({ error: "Car not found" });

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

  // GET cars 
  async list(req, res) {
    try {
      const { year, final_plate, brand } = req.query;

      let page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 5;

      if (page < 1) page = 1;
      if (limit < 1) limit = 5;
      if (limit > 10) limit = 10;

      const offset = (page - 1) * limit;

      const where = {};
      if (year) {
        where.year = { [Op.gte]: parseInt(year) };
      }
      if (final_plate) {
        where.plate = { [Op.like]: `%${final_plate}` };
      }
      if (brand) {
        where.brand = { [Op.like]: `%${brand}%` };
      }

      const { count, rows } = await Car.findAndCountAll({
        where,
        offset,
        limit,
        order: [["id", "ASC"]],
      });

      const pages = Math.ceil(count / limit);

      return res.status(200).json({ count, pages, data: rows });
    } catch (error) {
      console.error("Error listing cars:", error);
      return res.status(500).json({ error: "An unexpected error occurred" });
    }
  }

  async patch(req, res) {
    const { id } = req.params;
    const partialData = req.body;
  
    try {
      const car = await Car.findByPk(id);
      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }
  
      const errors = await validatePatchCarData(partialData, car);
  
      if (errors.length > 0) {
        const statusCode = errors.includes("car already registered") ? 409 : 400;
        return res.status(statusCode).json({ errors });
      }
  
      await car.update(partialData);
      return res.status(200).json(car);
    } catch (error) {
      console.error("Error patching car:", error);
      return res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
}

module.exports = new CarController();
