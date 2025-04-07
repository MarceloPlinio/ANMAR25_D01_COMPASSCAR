const CarItem = require("../models/carItem");
const Car = require("../models/car");

class CarItemController {
  async updateItems(req, res) {
    console.log("Entered updateItems in carItemController");
    const { id: carId } = req.params;
    const items = req.body;

    const errors = [];

    if (!Array.isArray(items)) {
      console.warn("Invalid request: 'items' is not an array");
      return res.status(400).json({
        errors: ["items must be an array"],
      });
    }

    if (items.length === 0) {
      console.warn("'items' array is empty");
      errors.push("items is required");
    }

    if (items.length > 5) {
      console.warn("'items' array exceeds the limit of 5");
      errors.push("items must be a maximum of 5");
    }

    const uniqueItems = new Set(items.map((item) => item.toLowerCase().trim()));
    if (uniqueItems.size < items.length) {
      errors.push("items cannot be repeated");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const car = await Car.findByPk(carId);
    if (!car) {
      return res.status(404).json({
        errors: ["car not found"],
      });
    }

    try {
      await CarItem.destroy({ where: { car_id: carId } });

      const carItems = items.map((item) => ({
        car_id: carId,
        name: item,
      }));

      await CarItem.bulkCreate(carItems);

      console.log("Items successfully saved to the database");

      return res.status(204).send();
    } catch (error) {
      console.error("Error saving car items:", error);

      return res.status(500).json({
        errors: ["An unexpected error occurred while updating car items."],
      });
    }
  }
}

module.exports = new CarItemController();
