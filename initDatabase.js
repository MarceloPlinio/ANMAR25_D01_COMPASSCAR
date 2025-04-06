// initDatabase.js
const mysql = require("mysql2");

function createDatabaseIfNotExists() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
    });

    connection.query("CREATE DATABASE IF NOT EXISTS compasscar", (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("Database 'compasscar' is ready.");
        resolve();
      }

      connection.end();
    });
  });
}

module.exports = createDatabaseIfNotExists;
