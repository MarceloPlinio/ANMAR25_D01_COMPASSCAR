const express = require("express");
const app = express();
const port = 3000;

const router = require("./routers/index");
const conn = require("./database/connection");
const sequelize = require("./database/sequelize");
const tables = require("./database/tables");
const carRoute = require("./routers/carsRoute");

app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log("Database sync with sequelize.");

    router(app, express);
    tables.init(conn);
    app.use("/api/v1", carRoute);

    app.listen(port, (error) => {
      if (error) {
        console.log("An error has occurred");
        return;
      }
      console.log(`Running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error to sync database:", err);
  });


// Middleware Gneric error
app.use((err, req, res, next) => {
  console.error(err);  
  res.status(500).json({ errors: ["Internal server error"] });  
});
