const express = require("express");
const app = express();
const port = 3000;
const router = require("./routers/index");
const conn = require("./database/connection");
const tables = require("./database/tables");
const carRoute = require('./routers/carsRoute')

router(app, express);
tables.init(conn);


app.use("/api/v1", carRoute);

app.listen(3000, (error) => {
  if (error) {
    console.log("An error has occurred");
    return;
  }
  console.log("Running");
});
