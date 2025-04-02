const conn = require("../database/connection");
class CarModel {
  read() {
    const sql = "SELECT * FROM cars";
    return new Promise((resolve, reject) => {
      conn.query(sql, {}, (error, response) => {
        if (error) {
          console.log("Error listing cars...");
          reject(error);
        }
        console.log("Cars listed here");
        resolve(response);
      });
    });
  }

  create(newCar) {
    const sql = "INSERT INTO cars SET ?";
    return new Promise((resolve, reject) => {
      conn.query(sql, newCar, (error, response) => {
        if (error) {
          console.log("Error inserting car");
          reject(error);
        }
        console.log("Car inserted successfully");
        resolve(response);
      });
    });
  }

  update(updateCar, id) {
    const sql = "UPDATE cars SET ? WHERE ID = ?";
    return new Promise((resolve, reject) => {
      conn.query(sql, [updateCar, id], (error, response) => {
        if (error) {
          console.log("Error updating car");
          reject(error);
        }
        console.log("Car updated successfully");
        resolve(response);
      });
    });
  }

  delete(id) {
    const sql = "DELETE FROM cars WHERE ID = ?";
    return new Promise((resolve, reject) => {
      conn.query(sql, id, (error, response) => {
        if (error) {
          console.log("Error deleting car");
          reject(error);
        }
        console.log("Car deleted successfully");
        resolve(response);
      });
    });
  }
}

module.exports = new CarModel();
