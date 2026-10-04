const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();

// Activity 7: Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'student_management'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Activity 8: Configure Express Middleware & View Engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Activity 9: Display Student List (Homepage)
app.get('/', (req, res) => {
    db.query('SELECT * FROM students ORDER BY id DESC', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        res.render('index', {
            students: results
        });
    });
});

// Activity 12: Show Add Student Form
app.get('/students/add', (req, res) => {
    res.render('add');
});

// Activity 13: Process Add Student Form
app.post('/students/add', (req, res) => {
    const {
        student_id,
        first_name,
        last_name,
        course,
        year_level,
        email
    } = req.body;

    const sql = `
        INSERT INTO students 
        (student_id, first_name, last_name, course, year_level, email) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        student_id,
        first_name,
        last_name,
        course,
        year_level,
        email
    ];

    db.query(sql, values, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Unable to save student');
        }
        res.redirect('/');
    });
});

// Activity 22: Add Student Search
app.get('/students/search', (req, res) => {
    const keyword = req.query.keyword || '';
    const sql = `
        SELECT * FROM students 
        WHERE student_id LIKE ? 
           OR first_name LIKE ? 
           OR last_name LIKE ? 
           OR course LIKE ?
    `;
    const searchValue = `%${keyword}%`;

    db.query(
        sql,
        [searchValue, searchValue, searchValue, searchValue],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Search error');
            }
            res.render('index', {
                students: results
            });
        }
    );
});

// Part IV: Show Edit Student Form
app.get('/students/edit/:id', (req, res) => {
    const studentId = req.params.id;
    const sql = 'SELECT * FROM students WHERE id = ?';

    db.query(sql, [studentId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        if (results.length === 0) {
            return res.status(404).send('Student not found');
        }
        res.render('edit', { student: results[0] });
    });
});

// Part IV: Process Update Student Form
app.post('/students/edit/:id', (req, res) => {
    const studentId = req.params.id;
    const {
        student_id,
        first_name,
        last_name,
        course,
        year_level,
        email
    } = req.body;

    const sql = `
        UPDATE students 
        SET student_id = ?, first_name = ?, last_name = ?, course = ?, year_level = ?, email = ?
        WHERE id = ?
    `;

    const values = [
        student_id,
        first_name,
        last_name,
        course,
        year_level,
        email,
        studentId
    ];

    db.query(sql, values, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Unable to update student');
        }
        res.redirect('/');
    });
});

// Activity 30: Delete Student Feature
app.post('/students/delete/:id', (req, res) => {
    const studentId = req.params.id;
    const sql = 'DELETE FROM students WHERE id = ?';

    db.query(sql, [studentId], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Unable to delete student');
        }
        res.redirect('/');
    });
});

// Activity 11: Start Server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});