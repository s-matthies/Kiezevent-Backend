const express = require('express');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config(); // dotenv einbinden um .env-Datei zu lesen und die Umgebungsvariablen zu setzen
const routes = require('./routes');
const initdb = require('./initdb');

const app = express(); // Express-App erstellen
const PORT = 4000; 

app.use(cors());
app.use(express.json()); /

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'KiezEvents API',
            version: '1.0.0',
            description: 'A simple API to manage events in the neighborhood',
            contact: {
                name: 'SM',
            },
            servers: ["http://localhost:4000"]
        },
        schemes: ['http', 'https'],
    },
    apis: ['./routes.js']
}


const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', routes);
app.use('/init', initdb);

// listen on port 4000 
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ...`);
    }
})