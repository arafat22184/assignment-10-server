# 🛠️ HobbyHub Server

This is the **backend API** for [HobbyHub](https://assignment-10-client-715c7.web.app/), a full-stack web application for organizing and managing local hobby groups.  
The server is built with **Node.js**, **Express.js**, and **MongoDB**, and it handles all core backend functionality such as authentication, data management, and secure client-server communication.

---

## 🌐 Client Live Site

[![Live Site](https://img.shields.io/badge/Live_Site-HobbyHub-brightgreen)](https://assignment-10-client-715c7.web.app/)

---

## 🚀 Key Features

- 🔐 JWT-based Authentication & Protected Routes  
- 🧾 RESTful APIs for Groups, Users, and Participation  
- 🌍 CORS-enabled for secure frontend access  
- 🗃️ MongoDB Database Integration  
- 📂 Modular Folder Structure (routes, controllers, models)  
- 🛡️ Environment Variable support with `dotenv`

---

## 📦 Tech Stack

| Category      | Tools & Libraries                          |
| ------------- | ------------------------------------------ |
| **Runtime**   | Node.js                                    |
| **Framework** | Express.js                                 |
| **Database**  | MongoDB, Mongoose                          |
| **Auth**      | JSON Web Token (JWT)                       |
| **Env Config**| dotenv                                     |
| **Middleware**| CORS, Express JSON                         |

---

## 🏁 Getting Started

Follow these steps to run the project locally:

## 1. Clone the Repository

```bash
git clone https://github.com/arafat22184/assignment-10-server.git
```
### 2. Change the Directory
```bash
cd assignment-10-server
```
## 3. Install Dependencies
```bash
npm install
```
##  Create a .env File
```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
```
## Start the Server
```bash
npm start
```

📌 Example API Endpoints

| Method | Endpoint          | Description                                                           |
|--------|-------------------|-----------------------------------------------------------------------|
| GET    | /allGroups        | Get all hobby groups                                                  |
| GET    | /sixGroups        | Get six upcoming groups starting today or later, sorted by start date |
| GET    | /allGroups/:id    | Get a single hobby group by its ID                                    |
| POST   | /allGroups        | Create a new hobby group                                              |
| PUT    | /allGroups/:id    | Update an existing hobby group by ID                                  |
| DELETE | /allGroups/:id    | Delete a hobby group by ID                                            |
| GET    | /users/:email     | Get user information by email                                         |
| POST   | /jwt              | Generate a JWT access token                                           |

## 📁 Folder Structure
```
assignment-10-server/
├── .gitignore
├── .env
├── package.json
├── package-lock.json
├── vercel.json
├── index.js
```

🤝 Contributing
Contributions are welcome!
Feel free to fork this repository, open issues, or submit pull requests to improve functionality or fix bugs.

<p align="center"> <b>✨ Thank you for checking out the HobbyHub Server! ✨</b><br> <sub>Built with ❤️ by <a href="https://github.com/arafat22184">Al Arafat</a></sub> </p>
