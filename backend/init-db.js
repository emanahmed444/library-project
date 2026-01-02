const { Pool } = require('pg');
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'human_security_db',
    password: 'adminpassword',
    port: 5432,
});

async function setup() {
    try {
        // إنشاء الجداول الثلاثة المرتبطة (نظام مكتبة) [cite: 68]
        await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY, 
        name TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY, 
        title TEXT NOT NULL, 
        author TEXT, 
        category_id INT REFERENCES categories(id)
      );
      CREATE TABLE IF NOT EXISTS rentals (
        id SERIAL PRIMARY KEY, 
        book_id INT REFERENCES books(id), 
        student_name TEXT NOT NULL, 
        rental_date DATE DEFAULT CURRENT_DATE
      );
    `);
        console.log("Database Tables Created Successfully!");
    } catch (err) {
        console.error("Database Error:", err);
    }
    process.exit();
}
setup();