const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const CarItem = sequelize.define(
  "CarItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "cars_items",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = CarItem;
