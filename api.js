const express = require("express");
const cors = require('cors')
const app = express();
const port = 3000;

const router = require("./routers/index");
const sequelize = require("./database/sequelize");
const createDatabaseIfNotExists = require("./initDatabase");
const carRoute = require("./routers/carsRoute");

const Car = require("./models/car");
const CarItem = require("./models/carItem");

Car.hasMany(CarItem, {
  foreignKey: "car_id",
  as: "carItems",
  onDelete: "CASCADE",
});
CarItem.belongsTo(Car, {
  foreignKey: "car_id",
  onDelete: "CASCADE",
  as: "car",
});

app.use(cors());
app.use(express.json());
router(app, express);
app.use("/api/v1", carRoute);

createDatabaseIfNotExists()
  .then(() => {
    return sequelize.sync();
  })
  .then(() => {
    console.log("Database synced with Sequelize.");
    app.listen(port, (error) => {
      if (error) {
        console.log("An error has occurred");
        return;
      }
      console.log(`Running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Initialization failed:", err);
  });

// Middleware genric
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ errors: ["Internal server error"] });
});
