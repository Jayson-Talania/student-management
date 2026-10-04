# Student Management System

A full-stack Web Application built using Node.js, Express, EJS, and MySQL. This system allows administrators to perform complete CRUD (Create, Read, Update, Delete) operations and real-time multi-field search on student records.

## 🚀 Features

- **View Directory:** Display all student records in a structured, styled table.
- **Add Student:** Insert new student profiles with validation.
- **Edit Student:** Pre-fill existing records into forms and process database updates.
- **Delete Student:** Remove student records with browser confirmation prompts.
- **Search System:** Search across Student ID, First Name, Last Name, and Course using MySQL `LIKE` pattern matching.
- **Responsive UI:** CSS styled forms, tables, and buttons.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Templating Engine:** EJS (Embedded JavaScript)
- **Version Control:** Git & GitHub

## 📂 Project Structure

```text
student-management/
├── public/
│   └── style.css
├── views/
│   ├── index.ejs
│   ├── add.ejs
│   └── edit.ejs
├── app.js
├── package.json
└── README.md