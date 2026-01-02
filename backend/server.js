const express = require('express');
const { Pool } = require('pg');
const Keycloak = require('keycloak-connect');
const session = require('express-session');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'human_security_db',
    password: 'adminpassword',
    port: 5432,
});

const memoryStore = new session.MemoryStore();
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

const keycloak = new Keycloak({ store: memoryStore }, {
    "realm": "LibraryRealm",
    "auth-server-url": "http://localhost:8080/",
    "ssl-required": "external",
    "resource": "library-app",
    "public-client": true,
    "confidential-port": 0
});

app.use(keycloak.middleware());

// --- الـ APIs ---

app.get('/api/books', keycloak.protect(), async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/books', keycloak.protect('realm:admin'), async(req, res) => {
    const { title, author } = req.body;
    try {
        await pool.query('INSERT INTO books (title, author) VALUES ($1, $2)', [title, author]);
        await pool.query('INSERT INTO categories (name) VALUES ($1) ON CONFLICT (name) DO NOTHING', [author]);
        res.status(201).json({ message: 'Book and Category added successfully' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// المسار الجديد لتنظيم التصنيفات حسب المؤلف
app.get('/api/categories-with-books', keycloak.protect(), async(req, res) => {
    try {
        const result = await pool.query(`
            SELECT author as category_name, json_agg(title) as books 
            FROM books 
            GROUP BY author
        `);
        res.status(200).json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/borrows', keycloak.protect(), async(req, res) => {
    const { book_id } = req.body;
    const tokenContent = req.kauth.grant.access_token.content;
    const username = tokenContent.preferred_username || tokenContent.name || tokenContent.sub;

    try {
        await pool.query('INSERT INTO borrows (username, book_id, borrow_date) VALUES ($1, $2, NOW())', [username, book_id]);
        res.status(201).json({ message: 'Book borrowed successfully' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/books/:id', keycloak.protect('realm:admin'), async(req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM books WHERE id = $1', [id]);
        res.status(200).json({ message: 'Book Deleted Successfully' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/borrows', keycloak.protect(), async(req, res) => {
    try {
        const result = await pool.query(`
            SELECT borrows.*, books.title 
            FROM borrows 
            JOIN books ON borrows.book_id = books.id
            ORDER BY borrows.borrow_date DESC
        `);
        res.status(200).json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.use((err, req, res, next) => {
    if (err.message === 'Access denied' || err.status === 403) {
        return res.status(403).json({ error: 'Forbidden', message: 'Unauthorized action.' });
    }
    next(err);
});

app.listen(5000, () => {
    console.log('🚀 Backend secure server is running on port 5000');
});