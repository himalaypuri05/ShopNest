# ShopNest 🛒 - Full Stack MERN E-Commerce Platform

ShopNest is a modern, full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It provides essential e-commerce capabilities including product catalog management, authentication, ordering, payments, and admin analytics.

---

## 🚀 Features

- **User Authentication & Authorization**: Secure user registration, login, and JWT-based role protection (User / Admin).
- **Product Management**: Browse, search, and manage product inventory with image uploads via Cloudinary.
- **Order & Payment Processing**: Manage orders and checkout flow.
- **Admin Dashboard & Analytics**: Insights into products, orders, and sales performance.
- **Responsive UI**: Intuitive and modern user interface built with React.

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router DOM
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Media & File Storage**: Cloudinary, Multer
- **Authentication**: JSON Web Tokens (JWT), bcryptjs

---

## 📂 Project Structure

```text
ShopNest/
├── backend/
│   ├── config/         # Database and Cloudinary configuration
│   ├── controllers/    # API controllers (auth, product, order, analytics, payment)
│   ├── middleware/     # Auth and Admin middlewares
│   ├── model/          # Mongoose database models
│   ├── routes/         # Express API routes
│   ├── utils/          # Utility functions (email notifications, etc.)
│   ├── seed.js         # Initial database seeder
│   └── index.js        # Backend entry point
├── frontend/
│   ├── public/         # Static assets and index.html
│   └── src/
│       ├── components/ # Reusable UI components (Navbar, Footer, etc.)
│       ├── context/    # React context providers
│       ├── pages/      # Application views and pages
│       └── styles/     # CSS stylesheets
├── package.json        # Root scripts for running client & server concurrently
└── README.md
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)

### 2. Installation

Clone the repository:
```bash
git clone https://github.com/himalaypuri05/ShopNest.git
cd ShopNest
```

Install root, backend, and frontend dependencies:
```bash
npm install
npm run install:all
```

### 3. Environment Variables

Create a `.env` file in the `backend/` directory based on `backend/.env.example`:

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/shopnest-mern
JWt_SECRET=your_jwt_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Running the Application

To run both backend and frontend concurrently in development mode:
```bash
npm run dev
```

- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:5000`

---

## 📄 License
This project is licensed under the ISC License.
