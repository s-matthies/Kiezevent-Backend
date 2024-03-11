const express = require('express'); // Express-Modul einbinden
const router = express.Router(); // Express-Router-Modul einbinden
const client = require('./db'); // Importieren des Datenbank-Clients

router.get('/test', (req, res) => {
  res.send('KiezEvents API is running');
});

// Router exportieren
module.exports = router;

