const express = require("express");
const mysql = require("mysql2");
const { log } = require("node:console");

const app = express();

// Inicial Route

// Sql Connection
const connectBD = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "compasscar",
});

connectBD.connect(function (err) {
  if (err) {
    console.log(err);
  }

  console.log("Connected to MySQL!");

  app.listen(3000)
});
