const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const Car = require("./car");

const CarItem = sequelize.define("CarItem", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  car_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "cars_items",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
});

CarItem.belongsTo(Car, {
  foreignKey: "car_id",
  onDelete: "CASCADE",
});

module.exports = CarItem;
