# SmartLearn – AI-Powered Learning Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application with JWT authentication, role-based access, course management, quiz modules, and real-time dashboards.

**Built by:** Spoorthi R  
**Stack:** MongoDB · Express.js · React.js · Node.js · JWT · REST APIs

---

## Features
- JWT Authentication (Register / Login)
- Role-based access: Student, Faculty, Admin
- Course catalog with search & filter
- Interactive quiz with auto-scoring
- Progress tracking dashboards
- REST API backend with MongoDB

---

## Project Structure
```
mern-project/
├── frontend/          ← React.js app (deploy on Vercel)
│   └── src/
│       ├── components/
│       ├── App.js
│       ├── AuthContext.js
│       └── api.js
└── backend/           ← Node.js + Express API (deploy on Render)
    ├── models/
    ├── routes/
    └── server.js
```

---

## STEP 1 — Setup MongoDB Atlas (Free)

1. Go to https://www.mongodb.com/cloud/atlas and sign up (free)
2. Create a new **Free Cluster**
3. Create a database user (username + password)
4. Click **Connect → Drivers** → copy the connection string
5. Replace `<password>` with your password — looks like:
   `mongodb+srv://username:password@cluster.mongodb.net/smartlearn`

---

## STEP 2 — Deploy Backend on Render (Free)

1. Go to https://render.com and sign up (free)
2. Click **New → Web Service**
3. Connect your **GitHub backend repo**
4. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add **Environment Variables:**
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = any random string (e.g. `mysecretkey123`)
   - `PORT` = `5000`
6. Click **Deploy** — Render gives you a URL like `https://smartlearn-api.onrender.com`
7. Copy this URL — this is your **Backend URL**

---

## STEP 3 — Deploy Frontend on Vercel (Free)

1. Go to https://vercel.com and sign up (free)
2. Click **New Project → Import your frontend GitHub repo**
3. Add **Environment Variable:**
   - `REACT_APP_API_URL` = `https://your-backend-url.onrender.com/api`
4. Click **Deploy** — Vercel gives you a URL like `https://smartlearn.vercel.app`
5. This is your **Live Hosted Project Link** ✅

---

## STEP 4 — Push to GitHub

### Backend Repo
```bash
cd backend
git init
git add .
git commit -m "Initial commit - SmartLearn Backend"
git remote add origin https://github.com/yourusername/smartlearn-backend.git
git push -u origin main
```

### Frontend Repo
```bash
cd frontend
git init
git add .
git commit -m "Initial commit - SmartLearn Frontend"
git remote add origin https://github.com/yourusername/smartlearn-frontend.git
git push -u origin main
```

---

## STEP 5 — Fill the Trao Form

| Field | What to put |
|-------|-------------|
| GitHub Profile Link | https://github.com/yourusername |
| LinkedIn Profile Link | https://linkedin.com/in/yourprofile |
| Resume Link | Your Google Drive resume link |
| Hosted Project Link | https://smartlearn.vercel.app |
| Frontend Repository URL | https://github.com/yourusername/smartlearn-frontend |
| Backend Repository URL | https://github.com/yourusername/smartlearn-backend |
| Demo Video URL | Record a 2-min Loom video at loom.com |

---

## Local Development

### Backend
```bash
cd backend
npm install
cp .env.example .env    # Add your MONGO_URI and JWT_SECRET
npm run dev             # Runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env    # Add REACT_APP_API_URL=http://localhost:5000/api
npm start               # Runs on http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| GET | /api/auth/profile | Get profile |
| GET | /api/courses | Get all courses |
| POST | /api/courses | Create course |
| GET | /api/courses/:id | Get single course |
| POST | /api/courses/seed/sample | Seed sample courses |
| POST | /api/quiz/submit | Submit quiz |
| GET | /api/dashboard/stats | Dashboard statistics |
