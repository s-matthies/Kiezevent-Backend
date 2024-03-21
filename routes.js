const express = require('express'); // Express-Modul einbinden
const router = express.Router(); // Express-Router-Modul einbinden
const client = require('./db'); // Importieren des Datenbank-Clients


// Swagger-Dokumentation
/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the event
 *         title:
 *           type: string
 *           description: The title of the event
 *         date:
 *           type: Date
 *           description: The date of the event
 *         starttime:
 *           type: Time
 *           description: The start time of the event
 *         endtime:
 *           type: Time
 *           description: The end time of the event
 *         location:
 *           type: string
 *           description: The location of the event
 *         description:
 *           type: string
 *           description: The description of the event
 *         link:
 *           type: string
 *           format: uri
 *           description: The link related to the event
 */

// get all events
/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     description: Retrieves all events
 *     responses:
 *       '200':
 *         description: Successful request. List of events returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/events', async (req, res) => {
    const query = 'SELECT * FROM events';
    try {
        const result = await client.query(query);
        console.log(result);
        res.status(200).json(result.rows); 
    } catch (error) {
        console.log("error", error.stack); 
        res.status(500).json({ error: error });
    }
});


// create a new event
/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     description: Creates a new event with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the event
 *               date:
 *                 type: Date
 *                 description: The date of the event
 *               starttime:
 *                 type: Time
 *                 description: The start time of the event
 *               endtime:
 *                 type: Time
 *                 description: The end time of the event
 *               location:
 *                 type: string
 *                 description: The location of the event
 *               description:
 *                 type: string
 *                 description: The description of the event
 *               link:
 *                 type: string
 *                 format: uri
 *                 description: The link related to the event
 *     responses:
 *       '201':
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/events', async (req, res) => {
    // Überprüfen, ob die erforderlichen Felder ausgefüllt wurden
    if (!req.body || !req.body.title || !req.body.date || !req.body.location) {
        return res.status(400).json({ error: 'title, date, and location are required fields' });
    }

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
/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get one event by ID
 *     description: Retrieves an event by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful request. Event retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No event found with id=1
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
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


// update one event by 
/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event by ID
 *     description: Updates an existing event with the provided details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the event
 *               date:
 *                 type: Date
 *                 description: The updated date of the event
 *               starttime:
 *                 type: Time
 *                 description: The updated start time of the event
 *               endtime:
 *                 type: Time
 *                 description: The updated end time of the event
 *               location:
 *                 type: string
 *                 description: The updated location of the event
 *               description:
 *                 type: string
 *                 description: The updated description of the event
 *               link:
 *                 type: string
 *                 format: uri
 *                 description: The updated link related to the event
 *     responses:
 *       '200':
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No event found with id=1
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
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
/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     description: Deletes an event with the provided ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event with id=1 deleted successfully.
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No event found with id=1
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
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

