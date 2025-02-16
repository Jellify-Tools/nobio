const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// MongoDB verbinden
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose-Modell
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', itemSchema);

// EJS als Template-Engine einrichten
app.set('view engine', 'ejs');
app.set('views', './views');

// Route zum Anzeigen aller Dokumente
app.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.render('index', { items });
  } catch (err) {
    res.status(500).send('Serverfehler');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
