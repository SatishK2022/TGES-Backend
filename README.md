# TGES Backend

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Functionality](#functionality)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Api Endpoints](#api-endpoints)
   - [User](#user)
   - [Travel](#travel)
   - [Dashboard](#dashboard)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

Welcome to the TGES Backend documentation. This repository contains the backend codebase for the TGES project. TGES is a traveling platform aiming to provide users with a seamless travelling experience.

This documentation aims to provide an overview of the project structure, setup instructions, API endpoints, and any other relevant information necessary for developers to understand and contribute to the project.

## Project Structure

The project structure is organized as follows:

```
TGES-Backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controller/
│   │   ├── air.controller.js
|   |   ├── cab.controller.js
│   │   ├── train.controller.js
│   │   ├── hotel.controller.js
│   │   ├── volvo.controller.js
│   │   ├── passport.controller.js
│   │   ├── travelInsurance.controller.js
│   │   ├── healthInsurance.controller.js
│   │   ├── healthcheck.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── corporateDashboard.controller.js
│   │   ├── vendorDashboard.controller.js
│   │   ├── miscellaneous.controller.js
│   │   └── user.controller.js
│   ├── email/
│   │   └── email-template.js
│   ├── logger/
│   │   ├── developmentLogger.js
│   │   ├── productionLogger.js
│   │   └── index.js
│   ├── middlewares
│   │   ├── multer.middleware.js
│   │   └── auth.middleware.js
│   ├── routes
│   │   ├── travel.routes.js
│   │   ├── user.routes.js
│   │   ├── dashboard.routes.js
│   │   ├── corporateDashboard.routes.js
│   │   ├── vendorDashboard.routes.js
│   │   ├── healthcheck.routes.js
│   │   └── miscellaneous.routes.js
│   ├── static_files/
|   |   ├── email_templates/
│   │   └── uploads/
│   ├── utils
|   |   ├── asyncHandler.js
|   |   ├── ApiResponse.js
│   │   ├── helper.js
│   │   └── sendMail.js
│   ├── constants.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Functionality

### User Registration

The `user.controller.js` file contains controllers for user registration. Three types of registrations are handled: retail, corporate, and vendor. Each registration involves:

- Validation of input data
- Checking if the respective table exists in the database; if not, creating it
- Hashing the password using bcryptjs
- Sending a confirmation email upon successful registration

### Travel Request

#### Air Travel

The `air.controller.js` file contains controllers for air travel. It includes functionality to create, update, and delete air travel data.

#### Cab Travel

The `cab.controller.js` file contains controllers for cab travel. It includes functionality to create, update, and delete cab travel data.

#### Train Travel

The `train.controller.js` file contains controllers for train travel. It includes functionality to create, update, and delete train travel data.

#### Volvo Bus Travel

The `volvo.controller.js` file contains controllers for volvo bus travel. It includes functionality to create, update, and delete volvo bus travel data.

#### Hotel Booking

The `hotel.controller.js` file contains controllers for hotel booking. It includes functionality to create, update, and delete hotel booking data.

#### Passport

The `passport.controller.js` file contains controllers for passport. It includes functionality to create, update, and delete passport data.

#### Travel Insurance

The `travelInsurance.controller.js` file contains controllers for travel insurance. It includes functionality to create, update, and delete travel insurance data.

#### Health Insurance

The `healthInsurance.controller.js` file contains controllers for health insurance. It includes functionality to create, update, and delete health insurance data.

### Routes

- The `user.routes.js` file defines routes for user-related operations. It includes endpoints for user registration, login, and other user-related functionalities.

- The `travel.routes.js` file defines routes for the travel-related operations. It includes endpoints for air travel, cab travel, hotel booking, train travel, and volvo bus travel.

- The `dashboard.routes.js` file defines routes for dashboard-related operations. It includes endpoints for dashboard data retrieval and other dashboard-related functionalities.

- The `corporateDashboard.routes.js` file defines routes for corporate dashboard-related operations. It includes endpoints for corporate dashboard data retrieval and other corporate dashboard-related functionalities.

- The `vendorDashboard.routes.js` file defines routes for vendor dashboard-related operations. It includes endpoints for vendor dashboard data retrieval and other vendor dashboard-related functionalities.

- The `healthcheck.routes.js` file defines routes for healthcheck-related operations. It includes endpoints for healthcheck data retrieval and other healthcheck-related functionalities.

- The `miscellaneous.routes.js` file defines routes for miscellaneous operations. It includes endpoints for sending emails for contact us and other miscellaneous functionalities.


### Utilities

#### ApiResponse

The `ApiResponse.js` utility formats the response sent by the server, ensuring consistency and ease of use across the application.

#### AsyncHandler

The `asyncHandler.js` utility handles asynchronous tasks, allowing for cleaner and more concise error handling in route handlers.

#### SendMail

The `sendMail.js` utility facilitates sending emails, which is used for sending confirmation emails upon user registration.

#### Helper

The `helper.js` utility contains reusable functions that can be used across different parts of the application.

## Technologies Used

- Node.js
- Express.js
- mySQL
- bcryptjs (for password hashing)
- Nodemailer (for sending emails)
- exceljs (for handling excel files)
- Multer (for file upload)

## Setup Instructions

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/SatishK2022/TGES-Backend.git
   ```

2. Navigate into the project directory:

   ```bash
   cd TGES-Backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the root directory and add the following environment variables:

   ```bash
    PORT=3000

    # For JWT
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRY=your_jwt_expiry

    # For MySQL
    DB_HOST=your_database_host
    DB_USER=your_database_username
    DB_PASS=your_database_password
    DB_NAME=your_database_name

    # For Sending Emails
    SMTP_SERVICE=your_smtp_service
    SMTP_PORT=your_smtp_port
    SMTP_USER=your_smtp_email
    SMTP_PASS=your_smtp_password

    NODE_ENV=your_node_env
   ```

5. Start the server:

   ```bash
   npm run dev
   ```

## API Endpoints

The following API endpoints are available:

### User
- **POST** `/api/v1/user/retail-register`
  - **Functionality:** Create a new retail user
  - **Request Format:** JSON
  - **Expected Response(s):**
    1. Success: `201 Created`
    2. Errors:
       - `400 Bad Request` if any of the required fields are missing
       - `409 Conflict` if the email is already in use
       - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/user/corporate-register`
  - **Functionality:** Create a new corporate user
  - **Request Format:** JSON
  - **Expected Response(s):**
    1. Success: `201 Created`
    2. Errors:
       - `400 Bad Request` if any of the required fields are missing
       - `409 Conflict` if the email is already in use
       - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/user/vendor-register`
  - **Functionality:** Create a new vendor
  - **Request Format:** JSON
  - **Expected Response(s):**
    1. Success: `201 Created`
    2. Errors:
       - `400 Bad Request` if any of the required fields are missing
       - `409 Conflict` if the email is already in use
       - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/user/login`
  - **Functionality:** Login a user
  - **Request Format:** JSON
  - **Expected Response(s):**
    1. Success: `200 OK`
    2. Errors:
       - `400 Bad Request` if any of the required fields are missing
       - `401 Unauthorized` if the credentials are invalid
       - `404 Not Found` if the user is not found
       - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/user/logout`
  - **Functionality:** Logout a user
  - **Request Format:** JSON
  - **Expected Response(s):**
    1. Success: `200 OK`
    2. Errors:
       - `401 Unauthorized` if the user is not authenticated
       - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/user/forgot-password`
  - **Functionality:** Forgot password
  - **Request Format:** JSON
  - **Expected Response(s):**
    1. Success: `200 OK`
    2. Errors:
       - `400 Bad Request` if any of the required fields are missing
       - `401 Unauthorized` if the user is not authenticated
       - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/user/verify-otp`
  - **Functionality:** Verify OTP
  - **Request Format:** JSON
  - **Expected Response(s):**
    1. Success: `200 OK`
    2. Errors:
       - `400 Bad Request` if any of the required fields are missing
       - `401 Unauthorized` if the user is not authenticated
       - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/user/reset-password`
  - **Functionality:** Reset password
  - **Request Format:** JSON
  - **Expected Response(s):**
    1. Success: `200 OK`
    2. Errors:
       - `400 Bad Request` if any of the required fields are missing
       - `401 Unauthorized` if the user is not authenticated
       - `500 Internal Server Error` if an unexpected error occurs

### Travel
- **POST** `/api/v1/travel/train`
  - **Functionality:** Create a new train travel
  - **Request Format:** JSON
  - **Expected Response(s):**
    1. Success: `201 Created`
    2. Errors:
       - `400 Bad Request` if any of the required fields are missing
       - `401 Unauthorized` if the user is not authenticated
       - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/travel/train`
   - **Functionality:** Get all train travels
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **PUT** `/api/v1/travel/train/{id}`
   - **Functionality:** Update a train travel
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **DELETE** `/api/v1/travel/train/{id}`
   - **Functionality:** Delete a train travel
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/travel/air`
   - **Functionality:** Create a new air travel
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `201 Created`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/travel/air`
   - **Functionality:** Get all air travels
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **PUT** `/api/v1/travel/air/{id}`
   - **Functionality:** Update a air travel
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **DELETE** `/api/v1/travel/air/{id}`
   - **Functionality:** Delete a air travel
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/travel/cab`
   - **Functionality:** Create a new cab travel
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `201 Created`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/travel/cab`
   - **Functionality:** Get all cab travels
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **PUT** `/api/v1/travel/cab/{id}`
   - **Functionality:** Update a cab travel
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **DELETE** `/api/v1/travel/cab/{id}`
   - **Functionality:** Delete a cab travel
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/travel/bus`
   - **Functionality:** Create a new volvo bus travel
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `201 Created`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/travel/bus`
   - **Functionality:** Get all volvo bus travels
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **PUT** `/api/v1/travel/bus/{id}`
   - **Functionality:** Update a volvo bus travel
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **DELETE** `/api/v1/travel/bus/{id}`
   - **Functionality:** Delete a volvo bus travel
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/travel/hotel`
   - **Functionality:** Create a new hotel booking
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `201 Created`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/travel/hotel`
   - **Functionality:** Get all hotel bookings
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **PUT** `/api/v1/travel/hotel/{id}`
   - **Functionality:** Update a hotel booking
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **DELETE** `/api/v1/travel/hotel/{id}`
   - **Functionality:** Delete a hotel booking
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/travel/passport`
   - **Functionality:** Create a new passport booking
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `201 Created`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/travel/passport`
   - **Functionality:** Get all passport bookings
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **PUT** `/api/v1/travel/passport/{id}`
   - **Functionality:** Update a passport booking
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **DELETE** `/api/v1/travel/passport/{id}`
   - **Functionality:** Delete a passport booking
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/travel/travelInsurance`
   - **Functionality:** Create a new travel insurance
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `201 Created`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/travel/travelInsurance`
   - **Functionality:** Get all travel insurance
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **PUT** `/api/v1/travel/travelInsurance/{id}`
   - **Functionality:** Update a travel insurance
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **DELETE** `/api/v1/travel/travelInsurance/{id}`
   - **Functionality:** Delete a travel insurance
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/travel/healthInsurance`
   - **Functionality:** Create a new health insurance
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `201 Created`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/travel/healthInsurance`
   - **Functionality:** Get all health insurance
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **PUT** `/api/v1/travel/healthInsurance/{id}`
   - **Functionality:** Update a health insurance
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **DELETE** `/api/v1/travel/healthInsurance/{id}`
   - **Functionality:** Delete a health insurance
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

### Dashboard

#### Admin Dashboard APIs

- **POST** `/api/v1/dashboard/login`
   - **Functionality:** Admin Login
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/dashboard/logout`
   - **Functionality:** Admin Logout
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/dashboard/retail`
   - **Functionality:** Get all retail users
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/dashboard/corporate`
   - **Functionality:** Get all corporate users
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/dashboard/vendor`
   - **Functionality:** Get all vendors
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/dashboard/train`
   - **Functionality:** Get all train bookings
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/dashboard/air`
   - **Functionality:** Get all air bookings
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/dashboard/cab`
   - **Functionality:** Get all cab bookings
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/dashboard/bus`
   - **Functionality:** Get all bus bookings
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/dashboard/hotel`
   - **Functionality:** Get all hotel bookings
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/dashboard/passport`
   - **Functionality:** Get all passport bookings
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/dashboard/travelInsurance`
   - **Functionality:** Get all travel insurance
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/dashboard/healthInsurance`
   - **Functionality:** Get all health insurance
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/dashboard/getCabRateCard`
   - **Functionality:** Get cab rate card
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs


#### Corporate Dashboard APIs

- **POST** `/api/v1/corporate/branch`
   - **Functionality:** Create a new branch
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `201 Created`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **PUT** `/api/v1/corporate/branch/{branchId}`
   - **Functionality:** Update a branch
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **DELETE** `/api/v1/corporate/branch/{branchId}`
   - **Functionality:** Delete a branch
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/corporate/branch/all`
   - **Functionality:** Get all branches
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/corporate/employee/{branchId}`
   - **Functionality:** Create a new employee
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `201 Created`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/corporate/employee/{branchId}`
   - **Functionality:** Get all employees
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **PUT** `/api/v1/corporate/employee/{employeeId}`
   - **Functionality:** Update an employee
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **DELETE** `/api/v1/corporate/employee/{employeeId}`
   - **Functionality:** Delete an employee
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/corporate/employee`
   - **Functionality:** Get single employee
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/corporate/employees`
   - **Functionality:** Get all employees
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs


#### Vendor Dashboard APIs

- **POST** `/api/v1/vendor/ratecard/cab`
   - **Functionality:** Create a new cab ratecard
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `201 Created`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/vendor/ratecard/cab`
   - **Functionality:** Get all cab ratecards
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **PUT** `/api/v1/vendor/ratecard/cab/{id}`
   - **Functionality:** Update a cab ratecard
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **DELETE** `/api/v1/vendor/ratecard/cab/{id}`
   - **Functionality:** Delete a cab ratecard
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/vendor/ratecard/cab/upload`
   - **Functionality:** Upload a cab ratecard
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `201 Created`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/vendor/ratecard/cab/download`
   - **Functionality:** Download a cab ratecard
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/vendor/ratecard/hotel`
   - **Functionality:** Create a new hotel ratecard
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `201 Created`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/vendor/ratecard/hotel`
   - **Functionality:** Get all hotel ratecards
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **PUT** `/api/v1/vendor/ratecard/hotel/{id}`
   - **Functionality:** Update a hotel ratecard
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **DELETE** `/api/v1/vendor/ratecard/hotel/{id}`
   - **Functionality:** Delete a hotel ratecard
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/vendor/ratecard/hotel/upload`
   - **Functionality:** Upload a hotel ratecard
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `201 Created`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **GET** `/api/v1/vendor/ratecard/hotel/download`
   - **Functionality:** Download a hotel ratecard
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`
     2. Errors:
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs


#### Health Check APIs

- **GET** `/api/v1/status`
   - **Functionality:** Health check
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`


#### Misc APIs

- **GET** `/api/v1/contact`
   - **Functionality:** Get contact details
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `200 OK`


## Contributing

Contributions to the TGES Backend project are welcome! If you find any issues or would like to add new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
