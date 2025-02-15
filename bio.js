const express = require('express');
const { connect } = require('./db'); // Importiere die Verbindungsfunktion
const router = express.Router();

// Route, um Bio-Daten basierend auf der ID abzurufen
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const collection = await connect(); // Verbinde dich mit der Datenbank
        const bio = await collection.findOne({ id }); // Suche nach der Bio

        if (bio) {
            res.json(bio); // Sende die Bio-Daten als JSON zurück
        } else {
            res.status(404).json({ error: 'Bio nicht gefunden' });
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der Bio:', error);
        res.status(500).json({ error: 'Serverfehler' });
    }
});

module.exports = router;
