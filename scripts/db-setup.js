const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.sqlite');

db.on('open', () => {
    console.log('Database opened');
})

db.on('error', (error) => {
    console.error('Database error:', error);
})

// Setup database and tables
db.serialize(() => {
    // Create users table
    db.run(`CREATE TABLE users (
        id TEXT PRIMARY KEY,
        firstName TEXT NOT NULL CHECK(length(firstName) <= 128),
        lastName TEXT NOT NULL CHECK(length(lastName) <= 128),
        age INTEGER NOT NULL CHECK(age >= 0 AND age <= 150),
        email TEXT NOT NULL CHECK(length(email) <= 256)
    )`);
});
