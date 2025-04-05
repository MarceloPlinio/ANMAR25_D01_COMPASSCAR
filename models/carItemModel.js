const conn = require("../database/connection");
class CarItemModel {
  executeQuery(sql, parameters = "") {
    return new Promise((resolve, reject) => {
      conn.query(sql, parameters, (error, response) => {
        if (error) {
          return reject(error);
        }
        return resolve(response);
      });
    });
  }

  read() {
    const sql = "SELECT * FROM cars_items";
    return this.executeQuery(sql);
  }

  create(newCar) {
    const sql = "INSERT INTO cars_items SET ?";
    return this.executeQuery(sql, newCar);
  }

  update(updateCar, id) {
    const sql = "UPDATE cars_items SET ? WHERE ID = ?";
    return this.executeQuery(sql, [updateCar, id]);
  }

  delete(id) {
    const sql = "DELETE FROM cars_items WHERE ID = ?";
    return this.executeQuery(sql, id);
  }

  findByPlate(plate) {
    const sql = "SELECT * FROM cars WHERE plate = ?";
    return this.executeQuery(sql, [plate]);
  }

  findById(id) {
    const sql = "SELECT * FROM cars WHERE id = ?";
    return this.executeQuery(sql, id);
  }
}

module.exports = new CarItemModel();
