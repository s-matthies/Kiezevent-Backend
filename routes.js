const express = require('express'); // Express-Modul einbinden
const router = express.Router(); // Express-Router-Modul einbinden

router.get('/test', (req, res) => {
  res.send('KiezEvents API is running');
});

// Router exportieren
module.exports = router;

