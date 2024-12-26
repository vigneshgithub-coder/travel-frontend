# Travel Agency Web Application

This is a full-stack travel agency web application designed to manage tour packages and bookings. It features a responsive frontend built with React.js and a backend powered by Node.js, Express, and MongoDB.

---

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Project Description
This application allows users to browse and book travel packages. Admins can manage packages, view bookings, and update package details through a dedicated admin panel. The system integrates invoice generation and email notifications.

---

## Features
- **Tour Packages Page** – Displays packages fetched from MongoDB.
- **Package Booking** – Form submission with invoice generation.
- **Admin Panel** – Manage tour packages and bookings.
- **Responsive Design** – Fully responsive for mobile and desktop.
- **Authentication** – Basic admin authentication for secure access.
- **Search & Filter** – (Optional) Search and filter packages by price, location, etc.

---

## Folder Structure
```
/project-root
│
├── client                   # Frontend React Application
│   ├── public
│   └── src
│       ├── components       # Reusable Components
│       ├── pages            # Page Components (Home, Booking)
│       └── services         # API Calls
│
├── server                   # Backend Node.js/Express API
│   ├── config               # Configuration Files
│   ├── controllers          # Route Handlers
│   ├── models               # Mongoose Models
│   └── routes               # API Routes
│
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (v5+)
- Git
- NPM or Yarn

### 1. Clone the Repository
```bash
git clone https://github.com/username/repo-name.git
cd repo-name
```

### 2. Install Dependencies
**Frontend**
```bash
cd client
npm install
```
**Backend**
```bash
cd server
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the `server` folder and add the following:
```
MONGO_URI=mongodb://localhost:27017/travelDB
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Run the Application
**Backend**
```bash
cd server
npm start
```
**Frontend**
```bash
cd client
npm start
```

Access the application at `http://localhost:3000`

---

## API Endpoints
- **GET /api/packages** – Fetch all packages
- **POST /api/bookings** – Create a new booking
- **PUT /api/packages/:id** – Update package (Admin)
- **DELETE /api/packages/:id** – Delete package (Admin)

---

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## License
[MIT](https://opensource.org/licenses/MIT)

