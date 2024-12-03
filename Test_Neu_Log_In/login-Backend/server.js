const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // CORS importieren

const app = express();
const port = 3000;

// CORS aktivieren
app.use(cors());  // Hier aktivierst du CORS für alle Routen

// Middleware
app.use(bodyParser.json());

// SQLite-Datenbank einrichten
const db = new sqlite3.Database('./users.db');
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)");
});

// Login-Endpunkt
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
        if (err) {
            res.status(500).json({ success: false, message: "Serverfehler" });
        } else if (row) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "Ungültige Anmeldedaten" });
        }
    });
});

// Registrierungs-Endpunkt
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
        if (err) {
            res.status(500).json({ success: false, message: "Serverfehler" });
        } else if (row) {
            res.json({ success: false, message: "Benutzername existiert bereits" });
        } else {
            db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err) => {
                if (err) {
                    res.status(500).json({ success: false, message: "Registrierung fehlgeschlagen" });
                } else {
                    res.json({ success: true });
                }
            });
        }
    });
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
