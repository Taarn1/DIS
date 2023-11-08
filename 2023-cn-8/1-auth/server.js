const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 5000;

app.use(bodyParser.json());

// Sqlite3 er en database, der gemmer data i en fil
// link: https://www.npmjs.com/package/sqlite3
const db = new sqlite3.Database('./db.sqlite');

db.serialize(function() {
    // Tabellen indeholder primærnøgle id, url, tidspunkt og caption
    db.run('CREATE TABLE if not exists keys (id integer primary key, value text not null, datetime integer)'); 
});

// Route to provide an authorization key
app.get('/authenticate', (req, res) => {
    // Generate a simple authorization key
    const authorizationKey = uuidv4();
    // Save the authorization key in the database
    db.serialize(function() {
        db.run('INSERT INTO keys (value, datetime) VALUES (?, ?)', [authorizationKey, Date.now()], function(err) {
            if(err) {
                console.error(err);
                return res.status(500).json(err);   
            }
        });
    });
    // Return the authorization key to the client
    res.json({ authorizationKey: authorizationKey });
});

// Route to handle authorization
app.post('/authorization', (req, res) => {
    const authorizationKey = req.body.authorizationKey;
    // Check if the authorization key exists in the database
    db.serialize(function() {
        db.get('SELECT * FROM keys WHERE value = ?', [authorizationKey], function(err, row) {
            if(err) {
                console.error(err);
                return res.status(500).json(err);   
            }
            // If the authorization key exists, return a 200 status code
            if(row) {
                return res.sendStatus(200);
            }
            // If the authorization key does not exist, return a 401 status code
            return res.sendStatus(401);
        });
    });
});

app.listen(port, () => {
    console.log(`Auth server is running on http://localhost:${port}`);
});
