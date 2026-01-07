# EventHub 📅

A full-stack MERN application designed to be a comprehensive directory for event management companies, allowing users to browse, search, and connect with organizers. This platform also empowers event organizers to list and manage their own company profiles.


---

## 🌟 Project Overview

Make My Events is a dynamic web platform built to bridge the gap between people planning events and the professionals who can bring them to life. In a crowded market, finding the right event planner can be challenging. This application provides a centralized, easy-to-navigate directory where users can filter companies by category and search for specific services.

For event management professionals, it offers a user-friendly interface to create, update, and manage their business listings, giving them visibility to a targeted audience. The entire application is built with a secure authentication system, ensuring that user data and listings are protected.

---

## ✨ Key Features

* **Dynamic Search & Filtering:** Users can search for event companies by name and filter them by categories like "Wedding," "Corporate," or "Birthday."
* **Secure User Authentication:** Complete user registration and login system using JWT (JSON Web Tokens) for secure, session-based authentication. Passwords are encrypted using `bcrypt.js`.
* **User-Managed Listings (CRUD):** Authenticated users can Create, Read, Update, and Delete their own company listings through a dedicated "My Listings" dashboard.
* **Protected Routes:** Users must be logged in to contact organizers or manage listings, ensuring secure interactions.
* **Interactive UI:** A responsive and modern user interface built with React, featuring professional loading states, a dynamic navbar, and toast notifications for user feedback.
* **RESTful API:** A robust backend built with Node.js and Express, providing a well-structured API for all frontend operations.

---

## 🛠️ Technologies Used

This project is built with the MERN stack and other modern web technologies:

### Frontend
* **React.js**: A JavaScript library for building user interfaces.
* **React Router**: For declarative routing in the application.
* **React Context API**: For robust, global state management of user authentication.
* **MDB UI Kit**: For styling and responsive components.
* **React Hot Toast**: For clean, professional user notifications.

### Backend
* **Node.js**: A JavaScript runtime for the server.
* **Express.js**: A web framework for Node.js to build the RESTful API.
* **MongoDB Atlas**: A cloud-hosted NoSQL database.
* **Mongoose**: An ODM library for MongoDB to model application data.
* **JSON Web Tokens (JWT)**: For creating secure authentication tokens.
* **bcrypt.js**: For hashing and securing user passwords.
* **dotenv**: For managing environment variables.

---

## 🚀 How to Run the Project

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js and npm (or yarn) installed on your machine.
* A MongoDB Atlas account and a connection string.

### Installation & Setup

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/your_username/MakeMyEvents.git](https://github.com/your_username/MakeMyEvents.git)
    ```

2.  **Backend Setup**
    ```sh
    # 1. Navigate to the backend folder
    cd MakeMyEvents/Backend

    # 2. Install NPM packages
    npm install

    # 3. Create a .env file in the Backend folder and add your variables
    #    (This is crucial for security)
    MONGO_URI="your_mongodb_connection_string"
    JWT_SECRET="your_super_secret_key_for_signing_tokens"
    ```

3.  **Frontend Setup**
    ```sh
    # 1. Navigate to the root folder from the Backend folder
    cd ..

    # 2. Install NPM packages for the React app
    npm install
    ```

### Running the Application

You will need two separate terminals to run both the frontend and backend servers concurrently.

* **Terminal 1: Start the Backend Server**
    ```sh
    # Navigate to the Backend folder
    cd Backend

    # Start the server (usually with nodemon for development)
    npm start
    ```
    The backend will be running on `http://localhost:5000`.

* **Terminal 2: Start the Frontend Server**
    ```sh
    # Navigate to the root project folder
    cd MakeMyEvents

    # Start the React app
    npm start
    ```
    The application will open and be available at `http://localhost:3000`.

---


