class Tables {
  init(conn) {
    this.conn = conn;
    this.createTableCars();
    this.createTableCarsItems();
  }

  createTableCars() {
    const sql = `
            CREATE TABLE IF NOT EXISTS cars (
                id INT AUTO_INCREMENT PRIMARY KEY,
                brand VARCHAR(255) NOT NULL,
                model VARCHAR(255) NOT NULL,
                plate VARCHAR(50) NOT NULL UNIQUE,
                year INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

    this.conn.query(sql, (error) => {
      if (error) {
        console.log("Error creating table cars:", error);
      } else {
        console.log("Table cars created successfully!");
      }
    });
  }

  createTableCarsItems() {
    const sql = `
            CREATE TABLE IF NOT EXISTS cars_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                car_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (car_id) REFERENCES cars(id)
            );
        `;

    this.conn.query(sql, (error) => {
      if (error) {
        console.log("Error creating table cars_items:", error);
      } else {
        console.log("Table cars_items created successfully!");
      }
    });
  }
}

module.exports = new Tables();
