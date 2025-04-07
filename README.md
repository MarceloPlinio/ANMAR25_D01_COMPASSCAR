# CompassCar API

A RESTful API for managing a car inventory, including car information and associated items. Built with Node.js, Express, Sequelize, and MySQL.

## 🚀 Getting Started

These instructions will help you get a copy of the project running on your local machine for development and testing purposes.

### 📋 Prerequisites

- Node.js (v18 or higher)
- npm
- MySQL installed and running
- MySQL Workbench (optional, for managing the database visually)
- Postman
---  
📦 Installation

1. git clone https://github.com/MarceloPlinio/ANMAR25_D01_COMPASSCAR
2. cd ANMAR25_D01_COMPASSCAR
3. npm install 
---
### 📦 Required Dependencies

The main dependencies used are:
- express
- cors
- dotenv
- sequelize
- mysql2

Install them using:

```bash
npm install express cors dotenv sequelize mysql2
```
---
### ⚙️ Environment Setup
Create a .env file in the root directory with the following content:

```
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=compasscar
DB_HOST=127.0.0.1
DB_DIALECT=mysql
```
Replace your_mysql_user and your_mysql_password with your MySQL credentials.

---
### 📁 Database Manual Configuration
Create the database manually in MySQL:
```
CREATE DATABASE compasscar;
```
The app will automatically sync the necessary tables on startup using Sequelize:
cars
cars_items
You can also manage the DB with MySQL Workbench if preferred.

---

### ▶️ Running the API

To start the development server:
```
node api.js
```

Access it at (Postman, Insomnia, Your tool preference):
```
http://localhost:3000/api/v1/cars
```
---

## 📌 API Endpoints

### ➕ Create a Car
**POST** `/api/v1/cars`

Create a new car with required fields.

#### Request Body Valid Example:
```json
{
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2020,
  "plate": "ABC-1D23"
}
```

![image](https://github.com/user-attachments/assets/ce49b40b-8ea4-48e4-95b8-f9f7d01d677d)

Responses
201 Created – Car created successfully

400 Bad Request – Validation errors

---

## 🔍 List All Cars

GET /api/v1/cars

Lists all cars with optional filters and pagination.

![image](https://github.com/user-attachments/assets/ccc77581-e03d-43f5-8aa9-7654ccd966a9)


Query Parameters

- page: Page number (default: 1) example: api/v1/cars?page=2
- limit: Number of cars per page (default: 5): /api/v1/cars?limit=5
- brand: Filter by brand: /api/v1/cars?brand=Honda
- year: Filter by year: /api/v1/cars?year=2020
- final_plate: Filter by last character of the license plate: /api/v1/cars?final_plate=7
- You can combine multiple parameters, for example:
/api/v1/cars?page=2&limit=10&brand=Ford&year=2018&final_plate=3

Responses
200 OK – Returns a list of cars (paginated).

---

## 👀 Get Car by ID
GET /api/v1/cars/:id

![image](https://github.com/user-attachments/assets/da10a44c-be7c-42bc-ace2-61520646a516)

Fetches a specific car by its ID.

Responses
200 OK – Returns the car.

404 Not Found – Car not found.

---

## ✏️ Update a Car
PUT /api/v1/cars/:id

Updates all fields of an existing car.

```json
{
  "brand": "Fiat",
  "model": "Uno",
  "year": 2005,
  "plate": "XYZ-9A99",
}
```
![image](https://github.com/user-attachments/assets/93d83dea-3916-47ac-a184-4029f15cc86a)

Responses
204 No Content – Car updated successfully.

400 Bad Request – Validation errors.

404 Not Found – Car not found.

---

## 🧩 Partial Update a Car
PATCH /api/v1/cars/:id

Updates one or more specific fields of a car.
```json
{
  "year": 2017
}
```

Responses
204 No Content – Car updated.

400 Bad Request – Validation errors.

404 Not Found – Car not found.

---

🧾 Add or Replace Car Items
PUT /api/v1/cars/:id/items

Replaces the items associated with a car. (in array format!)

```json
["sound system", "GPS"]
```

Responses
204 No Content – Items added/updated.

400 Bad Request – Invalid item data.

404 Not Found – Car not found.

---

## ❌ Delete a Car
DELETE /api/v1/cars/:id

Deletes a car and all its related items.
Responses
204 No Content – Car deleted.

404 Not Found – Car not found.
```json 
{
  "errors": ["car not found"]
}

```

### 💥 Generic Error Handling
Any unhandled internal error returns:

Response:
500 Internal Server Error

```json
{
  "errors": ["an internal server error occurred"]
}
```

---

## 📊 API Status Codes

This API uses the following HTTP status codes to communicate responses:

| Status Code | Description                                                               | Used In Endpoint                               |
|-------------|---------------------------------------------------------------------------|------------------------------------------------|
| `200 OK`    | Request successful and data returned                                      | `GET /api/v1/cars`, `GET /api/v1/cars/:id`     |
| `201 Created` | Resource created successfully                                           | `POST /api/v1/cars`                            |
| `204 No Content` | Resource deleted or updated successfully with no response body      | `DELETE /api/v1/cars/:id`, `PUT /api/v1/cars/:id/items` |
| `400 Bad Request` | Input data is invalid (e.g. missing required fields, bad format)   | All endpoints with input validation            |
| `404 Not Found` | Resource not found based on provided ID or filters                   | `GET`, `PUT`, `DELETE` with invalid ID         |
| `500 Internal Server Error` | Unexpected error occurred in the server                  | All endpoints as fallback error                |

---

### 🛑 Error Response Format

All error responses follow the structure below:

```json
{
  "errors": [
    "error message 1",
    "error message 2"
  ]
}
```
---
## ✒️ Author

### All Status information

* **Marcelo Plinio** - *Desafio Compass* - [Marcelo Plinio Linkedin](https://www.linkedin.com/in/marceloplinio/)

## 📄 License

This project is under the license (compass Uol - Marcelo Plinio)

## 🎁 "Expressions of gratitude

* This challenge was extremely valuable;
* I gave my best to deliver the project, thank you to everyone at Compass;
  
---
### Attention! I left all branches and commits to show the progress of everything, without deleting anything, that's why it's 'polluted'.
