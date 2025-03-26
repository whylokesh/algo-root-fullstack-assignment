Task Management Web App 📝

Overview
This is a Full Stack Task Management Web App built using:

    Backend: Node.js, Express, SQLite

    Frontend: Next.js, TypeScript

    Deployment: Backend (Railway/Render), Frontend (Vercel)

📌 Live URL: 🔗 [algo-root-fullstack-assignment-live](https://algo-root-fullstack-assignment.vercel.app/)

Features 🚀
✅ Add Tasks – Create new tasks with a title and description
✅ View Tasks – Display all tasks from the database
✅ Mark as Completed – Click to toggle task completion
✅ Delete Tasks – Remove tasks permanently
✅ Persistent Storage – Uses SQLite for data persistence

Tech Stack 🛠️
Backend (Express + SQLite)

    Node.js – Server-side runtime

    Express.js – Lightweight backend framework

    SQLite – Simple & fast database

    TypeScript – Strongly typed JavaScript

    Sequelize (Optional if using ORM)

Frontend (Next.js + TypeScript)

    Next.js – React-based frontend framework

    Axios – HTTP client for API calls

    CSS Modules – Styling components

Setup & Installation ⚙️
1️⃣ Clone the Repository

git clone https://github.com/your-username/task-manager.git
cd task-manager

2️⃣ Backend Setup 

cd backend
npm install
npm run dev

    Runs the server at http://localhost:5000/api

3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

    Runs the frontend at http://localhost:3000

API Endpoints (Backend) 📡
Method	Endpoint	Description
GET	/api/tasks	Fetch all tasks
GET	/api/tasks/:id	Fetch task by ID
POST	/api/tasks	Create a new task
PUT	/api/tasks/:id	Update task (complete)
DELETE	/api/tasks/:id	Delete a task

Folder Structure 📂
task-manager/
│── backend/
│   ├── config/         # SQLite database config
│   ├── services/       # Task handling logic
│   ├── controllers/    # API controllers
│   ├── routes/         # API routes
│   ├── server.ts       # Express server entry
│   ├── package.json    # Backend dependencies
│── frontend/
│   ├── app/            # Next.js main pages
│   ├── services/       # API calls (Axios)
│   ├── types/          # TypeScript interfaces
│   ├── package.json    # Frontend dependencies
│── README.md           # Project documentation

Deployment 🌍
✅ Backend: Hosted on [Render]
✅ Frontend: Hosted on [Vercel]

📌 Live URL: 🔗 [algo-root-fullstack-assignment-live](https://algo-root-fullstack-assignment.vercel.app/)

Author & Credits 👨‍💻
    Your Name – Lokesh Jha

    GitHub: https://github.com/whylokesh

    LinkedIn: https://www.linkedin.com/in/lokesh-jha-32023b1b2/