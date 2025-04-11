const express = require('express');
const cors = require('cors');
const multer = require('multer'); 
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const recipesRoutes = require('./routes/recipes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup failu ikelimui
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// recepto ikelimas
const db = require('./db');
app.post('/api/recipes', upload.single('image'), (req, res) => {
  const { title, description } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  const q = 'INSERT INTO recipes (title, description, image) VALUES (?, ?, ?)';
  db.query(q, [title, description, imagePath], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Receptas įkeltas!' });
  });
});

// Autentifikacija ir kiti receptų maršrutai
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveris veikia ant ${PORT} porto`);
});
