const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config(); // Lade Umgebungsvariablen

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB-Verbindungs-URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware für JSON
app.use(express.json());

// Route, um Bio-Daten basierend auf der ID abzurufen
app.get('/api/bio/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await client.connect(); // Verbinde dich mit dem Cluster
        const database = client.db(process.env.MONGODB_DBNAME); // Wähle deine Datenbank
        const collection = database.collection(process.env.MONGODB_COLLECTION); // Wähle deine Collection

        // Suche nach der Bio mit der entsprechenden ID
        const bio = await collection.findOne({ id });

        if (bio) {
            res.json(bio); // Sende die Bio-Daten als JSON zurück
        } else {
            res.status(404).json({ error: 'Bio nicht gefunden' });
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der Bio:', error);
        res.status(500).json({ error: 'Serverfehler' });
    } finally {
        await client.close();
    }
});

// Statische Dateien (React-Build)
app.use(express.static('public'));

// Starte den Server
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
