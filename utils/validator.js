const Car = require("../models/car");
const { Op } = require("sequelize");


function isValidPlate(plate) {
  if (typeof plate !== "string" || plate.length !== 8) return false;

  const upperPlate = plate.toUpperCase();

  return (
    upperPlate.charAt(0) >= 'A' && upperPlate.charAt(0) <= 'Z' &&
    upperPlate.charAt(1) >= 'A' && upperPlate.charAt(1) <= 'Z' &&
    upperPlate.charAt(2) >= 'A' && upperPlate.charAt(2) <= 'Z' &&
    upperPlate.charAt(3) === '-' &&
    !isNaN(upperPlate.charAt(4)) &&
    upperPlate.charAt(5) >= 'A' && upperPlate.charAt(5) <= 'J' &&
    !isNaN(upperPlate.charAt(6)) &&
    !isNaN(upperPlate.charAt(7))
  );
}

function normalizePlate(plate) {
  return plate.toUpperCase();
}


function validateYear(year) {
  if (typeof year !== "number" || !Number.isInteger(year)) {
    return "year is required";
  }
  if (year < 2016 || year > 2026) {
    return "year must be between 2016 and 2026";
  }
  return null;
}


function validateBrand(brand) {
  if (typeof brand !== "string" || brand.trim() === "") {
    return "brand is required";
  }
  return null;
}


function validateModel(model) {
  if (typeof model !== "string" || model.trim() === "") {
    return "model is required";
  }
  return null;
}


async function isPlateDuplicate(plate, excludeId = null) {
  const where = { plate };
  if (excludeId) {
    where.id = { [Op.not]: excludeId };
  }

  const existing = await Car.findOne({ where });
  return !!existing;
}

async function validatePatchCarData(data, currentCar = null) {
    const errors = [];
  
    if (data.brand !== undefined && (typeof data.brand !== "string" || data.brand.trim() === "")) {
      errors.push("brand is required");
    }
  
    if (data.model !== undefined && (typeof data.model !== "string" || data.model.trim() === "")) {
      errors.push("model is required");
    }
  
    if (data.year !== undefined) {
      if (typeof data.year !== "number" || !Number.isInteger(data.year)) {
        errors.push("year is required");
      } else if (data.year < 2016 || data.year > 2026) {
        errors.push("year must be between 2016 and 2026");
      }
    }
  
    if (data.plate !== undefined) {
      if (typeof data.plate !== "string" || data.plate.trim() === "") {
        errors.push("plate is required");
      } else if (!isValidPlate(data.plate)) {
        errors.push("plate must be in the correct format ABC-1C34");
      } else {
        data.plate = data.plate.toUpperCase();
        const existingCar = await Car.findOne({ where: { plate: data.plate } });
        if (existingCar && (!currentCar || existingCar.id !== currentCar.id)) {
          errors.push("car already registered");
        }
      }
    }
  
    return errors;
  }


module.exports = {
  isValidPlate,
  normalizePlate,
  validateYear,
  validateBrand,
  validateModel,
  isPlateDuplicate,
  validatePatchCarData,
};
