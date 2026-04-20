# 📋 Full-Stack Task Management Dashboard

A responsive, full-stack web application designed to help users efficiently manage their daily tasks. It features real-time dashboard statistics, dynamic filtering, pagination, and a clean, modern UI.

**Live Frontend (Vercel):** [https://task-management-dashboard-teal.vercel.app/](https://task-management-dashboard-teal.vercel.app/)  
**Live API (Render):** [https://task-management-dashboard-ukaq.onrender.com/api/tasks/](https://task-management-dashboard-ukaq.onrender.com/api/tasks/)

---

## ✨ Features

* **Complete CRUD Functionality:** Create, read, update, and delete tasks seamlessly.
* **Real-Time Analytics:** Top-level dashboard cards instantly calculate Total, Completed, Pending, and Overdue tasks.
* **Advanced Filtering & Sorting:** Filter tasks by Status or Priority, and sort by Newest, Oldest, or Due Date.
* **Pagination:** Built-in backend pagination to ensure fast load times, regardless of database size.
* **Responsive Design:** Fully optimized for desktop, tablet, and mobile views using Flexbox.

---

## 🛠️ Tech Stack

**Frontend:**
* React.js (via Vite for faster builds)
* Axios (for API communication)
* Standard CSS (Vanilla)

**Backend:**
* Python & Django
* Django REST Framework (DRF)
* PostgreSQL (Production Database via Render)

---

## 🎨 Design Philosophy: Why Standard CSS?

For this project, I chose to write custom, standard CSS rather than relying on a heavy utility framework like Tailwind or a component library like Material-UI. 

**Justification:**
1.  **Zero Overhead:** Keeps the frontend bundle incredibly lightweight and fast.
2.  **Total Control:** Allows for precise, custom designs (like the linear-gradient backgrounds and glass-morphism modal blur) without fighting framework overrides.
3.  **Maintainability:** By utilizing modern CSS features like CSS Variables (`:root`) for theming and Flexbox for layout, the stylesheet remains highly modular, readable, and easy to maintain.
4.  **Demonstrating Fundamentals:** It showcases a strong, foundational understanding of styling, layout algorithms, and responsive media queries.

---

## 🚀 Local Setup & Installation

Follow these steps to run the project on your local machine.

### Prerequisites
* Node.js installed
* Python 3.10+ installed
* Git

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_GITHUB_USERNAME/task-management-dashboard.git](https://github.com/YOUR_GITHUB_USERNAME/task-management-dashboard.git)
cd "task-management-dashboard"


2. Backend Setup

Open a terminal in the Backend directory:cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create your local .env file (see template below)
# Run database migrations
python manage.py migrate

# Start the Django development server
python manage.py runserver

3. Frontend Setup

Open a new terminal in the Frontend directory: cd frontend

# Install Node dependencies
npm install

# Create your local .env file (see template below)
# Start the Vite development server
npm run dev


Environment Variables (.env Templates)
To run this project locally, you will need to create .env files in both the Frontend and Backend directories.

Backend (Backend/.env)
Create a .env file in the root of the Backend folder:

# Set to True for local development, False for production
DEBUG=True

# Optional: Add your local database credentials if not using default SQLite
# DB_NAME=your_db_name
# DB_USER=your_db_user
# DB_PASSWORD=your_password

Frontend (Frontend/.env)
Create a .env file in the root of the Frontend folder:

# Points Vite to the local Django server during development
VITE_API_URL=[http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)


API Endpoints
The Django REST API exposes the following primary endpoints:

GET /api/tasks/ - Retrieve a paginated list of tasks (Supports ?status=, ?priority=, ?sort_by=, ?page=).

POST /api/tasks/ - Create a new task.

PATCH /api/tasks/{id}/ - Update a specific task.

DELETE /api/tasks/{id}/ - Delete a specific task.

GET /api/dashboard-stats/ - Retrieve calculated statistics for the top-level cards.
