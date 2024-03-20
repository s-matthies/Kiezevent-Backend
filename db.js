const pg = require('pg'); // Postgres-Modul einbinden
require('dotenv').config(); 

// Datenbank-Client erstellen
const client = new pg.Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    database_url: process.env.DATABASE_URL

});

// Verbindung zur Datenbank herstellen
client.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connection to DB ...');
    }
});

module.exports = client;