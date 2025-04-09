const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const recipesRoutes = require('./routes/recipes'); // ⬅️ perkeltas aukščiau

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipesRoutes); // ⬅️ taip pat prieš listen()

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveris veikia ant ${PORT} porto`);
});
