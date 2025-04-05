const conn = require("../database/connection");
class CarModel {
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
    const sql = "SELECT * FROM cars";
    return this.executeQuery(sql);
  }

  create(newCar) {
    const sql = "INSERT INTO cars SET ?";
    return this.executeQuery(sql, newCar);
  }

  update(updateCar, id) {
    const sql = "UPDATE cars SET ? WHERE ID = ?";
    return this.executeQuery(sql, [updateCar, id]);
  }

  delete(id) {
    const sql = "DELETE FROM cars WHERE ID = ?";
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

module.exports = new CarModel();
