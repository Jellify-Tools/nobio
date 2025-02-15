const { MongoClient } = require('mongodb');

// Verbindungs-URL von MongoDB Atlas
mongodb+srv://Lokal:Lokal321@@cluster0.o2wwb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
async function connect() {
    try {
        await client.connect(); // Verbinde dich mit dem Cluster
        console.log('Verbunden mit MongoDB Atlas');
        const database = client.db('<datenbankname>'); // Wähle deine Datenbank
        const collection = database.collection('bios'); // Wähle deine Collection
        return collection;
    } catch (error) {
        console.error('Fehler beim Verbinden mit MongoDB:', error);
        throw error;
    }
}

module.exports = { connect };
