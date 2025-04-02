# ANMAR25_D01_COMPASSCAR

# Compass Car API

## 📌 Project Overview

Welcome to the **Compass Car API** project, an application developed to manage the car fleet of a rental company. This project consists of an **MVP (Minimum Viable Product)** of an API that allows you to perform CRUD (Create, Read, Update, Delete) operations on cars registered in the system.



## 🛠 Technologies Used

**Alteração chave:**

* `ORM: (Not yet using Sequelize in this branch version)` 

-   **Language:** JavaScript
-   **Framework:** Express.js
-   **Database:** MySQL
-   **ORM:** Sequelize

## 📌 API Features

The API should provide the following features:

-   **Register a car** in the database.
-   **Search for a car** by ID or list all registered cars.
-   **Update an existing car**.
-   **Delete a car** from the database.
-   **Ensure necessary validations** for vehicle data.

## 📂 Project inital Structure
![image](https://github.com/user-attachments/assets/1334d86e-7f77-4d28-8935-4076f180b77d)

## 📌 Requirements and Restrictions

✅ **Use MySQL** as the database.
✅ **Connect directly to MySQL Server** without XAMPP.

## 📦 Necessary Dependencies

To install the dependencies, use:

```sh
npm install express cors dotenv sequelize mysql2
```
## 🚀 How to Run the Project

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/MarceloPlinio/ANMAR25_D01_COMPASSCAR](https://github.com/MarceloPlinio/ANMAR25_D01_COMPASSCAR)
    ```
2.  **Access the directory:**
    ```sh
    cd ANMAR25_D01_COMPASSCAR
    ```
3.  **Install the dependencies:**
    ```sh
    npm install
    ```
4.  **Configure the database:**
    * Install MySQL Server.
    * Create a MySQL database.
    * Configure your database credentials in the `.env` file.
        * Example `.env`:
            ```env
            DB_HOST=localhost
            DB_USER=your_user
            DB_PASS=your_password
            DB_NAME=your_database
            DB_PORT=3306 
            ```
5.  **Start the application:**
    ```sh
    npm start
    ```

