#  Light Bootstrap Dashboard – Full Stack Version

This project is a customized full-stack version of the **Light Bootstrap Dashboard React** template.  
It integrates a **Node.js + Express + MongoDB** backend with the **React** frontend dashboard, enabling dynamic menu management, authentication, and admin control.

---

##  Features

### 🔹 Frontend (React)
- Built with **Light Bootstrap Dashboard React (v2.0.1)**
- Integrated **Material-UI** components
- **Dynamic Sidebar & Navbar** fetched from backend (via MenuContext)
- **Protected Routes** with JWT Authentication
- **Login & Logout functionality** using Axios
- Real-time Notifications using `react-notification-alert`
- Smooth UI animations and responsive design

### 🔹 Backend (Node.js + Express)
- RESTful APIs built with Express
- **JWT Authentication** and middleware protection
- **MongoDB + Mongoose** for persistent data storage
- API endpoints for:
  - Authentication (`/auth/login`, `/auth/signup`, `/logout`)
  - Menu Management (`/menus`)
- Configurable `.env` for environment variables


##  How It Works

1. **Login** authenticates the user using backend `/auth/login` API.
2. On success, JWT Token is stored in `localStorage`.
3. The **MenuContext** fetches menu items dynamically from `/menus` API.
4. **Admin panel** and sidebar render based on backend data (no hardcoded routes).
5. Logout triggers a confirmation dialog and clears session data.

---

##  Technologies Used

| Category | Technologies |

| Frontend | React, Bootstrap, Material-UI |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (JSON Web Token) |
| Styling | Light Bootstrap Dashboard Template |
| State Management | React Context API |

---

##  Setup Instructions

###  Prerequisites
- Node.js & npm installed
- MongoDB running locally or via cloud (MongoDB Atlas)

###  Backend Setup
```bash
cd backend
npm install
npm start

###  Frontend Setup
```bash
cd light-bootstrap-dashboard-react
npm install
npm start

The frontend runs at http://localhost:3000
The backend runs at http://localhost:5000


Author

Gaddam Janareddy 
https://github.com/gaddamjanareddy
