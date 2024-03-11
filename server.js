const express = require('express');
const cors = require('cors');
require('dotenv').config(); // dotenv einbinden um .env-Datei zu lesen und die Umgebungsvariablen zu setzen
const routes = require('./routes');

const app = express(); // Express-App erstellen
const PORT = 4000; 

app.use(express.json()); 
app.use(cors());    
app.use('/', routes); 

// listen on port 4000 
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ...`);
    }
})