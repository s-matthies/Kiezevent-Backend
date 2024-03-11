const express = require('express'); // Express-Modul einbinden
const router = express.Router(); // Express-Router-Modul einbinden
const client = require('./db'); // Importieren des Datenbank-Clients



// get all events
router.get('/events', async (req, res) => {
    const query = 'SELECT * FROM events';
    try {
        const result = await client.query(query);
        console.log(result);
        res.status(200).json(result.rows); 
    } catch (error) {
        console.log("error", err.stack); 
        res.status(500).json({ error: error });
    }
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

// get one event by id
router.get('/events/:id', async (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM events WHERE id = $1';
    try {
        const result = await client.query(query, [id]);
        console.log(result);
        if (result.rowCount == 1)
            res.status(200).json(result.rows[0]);
        else
            res.status(404).json({ message: "No event found with id=" + id });
    } catch (error) {
        console.log("error", err.stack);
        res.status(500).json({ error: error });
    }
}
);


// update one event by id
router.put('/events/:id', async (req, res) => {
    try{
        const query = `SELECT * FROM events WHERE id = $1`;
        const id = req.params.id;
    
        const result = await client.query(query, [id]);
        if (result.rowCount > 0) {
            let event = result.rows[0];
            let title = req.body.title ? req.body.title : event.title;
            let date = req.body.date ? req.body.date : event.date;
            let starttime = req.body.starttime ? req.body.starttime : event.starttime;
            let endtime = req.body.endtime ? req.body.endtime : event.endtime;
            let location = req.body.location ? req.body.location : event.location;
            let description = req.body.description ? req.body.description : event.description;
            let link = req.body.link ? req.body.link : event.link;

            const updateQuery = `UPDATE events SET 
                title = $1, 
                date = $2, 
                starttime = $3, 
                endtime = $4, 
                location = $5, 
                description = $6, 
                link = $7 
                WHERE id = $8 RETURNING *`;

            const updateResult = await client.query(updateQuery, [title, date, starttime, endtime, location, description, link, id]);
            console.log(updateResult);
            res.status(200).json(updateResult.rows[0]);
        } else {
            res.status(404).json({ message: "No event found with id=" + id });
        }
    } catch (error) {
        console.error(error.stack); 
        res.status(500).json({ error: error });
    }
}
);


// delete one event by id
router.delete('/events/:id', async (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM events WHERE id = $1';
    try {
        const result = await client.query(query, [id]);
        console.log(result);
        if (result.rowCount > 0) 
            res.status(200).json({ message: "Event with id=" + id + " deleted successfully."});
        else 
            res.status(404).json({ message: "No event found with id=" + id });
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: error });
    }
}
);



// Router exportieren
module.exports = router;

