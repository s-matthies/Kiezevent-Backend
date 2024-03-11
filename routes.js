const express = require('express'); // Express-Modul einbinden
const router = express.Router(); // Express-Router-Modul einbinden
const client = require('./db'); // Importieren des Datenbank-Clients

router.get('/test', (req, res) => {
  res.send('KiezEvents API is running');
});

// create a new event
router.post('/events', async (req, res) => {
    let title = (req.body.title);
    let date = (req.body.date);
    let starttime = (req.body.starttime) ? req.body.starttime : null;
    let endtime = (req.body.endtime) ? req.body.endtime : null;
    let location = (req.body.location);
    let description = (req.body.description) ? req.body.description : null;
    let link = (req.body.link) ? req.body.link : null;

    const query = 'INSERT INTO events (title, date, starttime, endtime, location, description, link) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

    try {
        const result = await client.query(query, [title, date, starttime, endtime, location, description, link]);
        console.log(result.rows[0]); 
        res.status(201).json(result.rows[0]); 
    } catch (error) {
        res.status(500).json({ error: error });
    }
});



// Router exportieren
module.exports = router;

