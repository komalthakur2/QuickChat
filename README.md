# 💬 QuickChat

QuickChat is a modern, feature-rich real-time messaging application built using the MERN Stack. It combines secure authentication, real-time communication, media sharing, and a sleek glassmorphic user interface to deliver a seamless chatting experience across desktop and mobile devices.

---

## 🌐 Live Demo

🔗 Frontend: https://quick-chat-eosin.vercel.app/login

Experience QuickChat directly in your browser without any local setup.

---

## ✨ Features

* **💬 Real-time Messaging**: Instant, low-latency messaging powered by Socket.io.
* **🟢 Live Presence Indicators**: Real-time tracking of online and offline users.
* **🖼️ Image & Media Sharing**: Share images directly in conversations, securely stored in the cloud.
* **🔐 Secure Authentication**: User signup, login, and protected routes using JSON Web Tokens (JWT).
* **👤 Profile Management**: Update profile photos, bios, and personal information with real-time synchronization.
* **🎨 Premium UI/UX**: Modern glassmorphic design with responsive layouts, smooth transitions, and elegant gradients.
* **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices.
* **🔔 Toast Notifications**: Instant feedback for user actions and system events.

---

## 🛠️ Tech Stack

### Frontend

* **React 19**
* **Vite**
* **Tailwind CSS v4**
* **Socket.io Client**
* **Axios**
* **React Router DOM v7**
* **React Hot Toast**

### Backend

* **Node.js**
* **Express.js**
* **Socket.io**
* **MongoDB**
* **Mongoose**
* **Cloudinary**
* **JWT (JSON Web Token)**

---

## 🚀 Getting Started

Follow these steps to set up QuickChat locally.

### Prerequisites

* Node.js (v18+ recommended)
* MongoDB Atlas or Local MongoDB Instance
* Cloudinary Account

### 1. Clone the Repository

```bash
git clone https://github.com/komalthakur2/QuickChat.git
cd QuickChat
```

### 2. Configure Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:

```bash
npm run dev
```

### 3. Configure Frontend

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` folder:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 📂 Project Structure

```text
QuickChat/
├── client/
│   ├── context/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── server/
    ├── controllers/
    ├── lib/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── server.js
    └── package.json
```

---

## 🌐 Deployment

### Backend (Vercel)

1. Link the backend directory to Vercel.
2. Configure environment variables:

   * `MONGODB_URI`
   * `JWT_SECRET`
   * `CLOUDINARY_CLOUD_NAME`
   * `CLOUDINARY_API_KEY`
   * `CLOUDINARY_API_SECRET`
3. Deploy the backend.

### Frontend

Deploy the frontend to Vercel, Netlify, or any static hosting platform.

Set:

```env
VITE_BACKEND_URL=your_backend_url
```

before deployment.

---

## 👩‍💻 Author

**Komal Kumari Thakur**

GitHub: https://github.com/komalthakur2

---

## 📌 Project Purpose

QuickChat was developed to explore modern full-stack web development concepts including real-time communication, authentication, media management, responsive UI design, and scalable MERN architecture.


