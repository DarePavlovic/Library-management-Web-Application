# Library Management System

This project is a Library Management System built with Angular for the frontend and Node.js with Express and MongoDB for the backend. It allows users to manage books, reservations, comments, and user accounts.

## Features

- User authentication and authorization
- Book management (add, update, delete)
- Reservation management
- Comment management
- User profile management
- Admin and moderator roles

## Project Structure

### Backend

The backend is located in the `backend/` directory and is built with Node.js, Express, and MongoDB.

- `src/controllers/`: Contains the controllers for handling requests.
- `src/models/`: Contains the Mongoose models.
- `src/routes/`: Contains the route definitions.
- `src/server.ts`: The main server file.

### Frontend

The frontend is located in the `frontend/app/` directory and is built with Angular.

- `src/app/`: Contains the Angular components, services, and modules.
- `src/assets/`: Contains the static assets.
- `src/environments/`: Contains the environment configurations.

## Getting Started

### Prerequisites

- Node.js
- Angular CLI
- MongoDB

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
```

2. Install the dependencies for the backend:

```sh
cd backend
npm install
```

3. Install the dependencies for the frontend:

```sh
cd ../frontend/app
npm install
```
### Running the Application

1. Start the MongoDB server.
2. Start the backend server:
```sh
cd backend
npm run build-ts
npm start
```
3. Start the frontend server:
```sh
cd frontend/app
ng serve
```
Navigate to http:://localhost:4200/ to access the application
