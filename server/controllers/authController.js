const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
  const { username, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);

  const q = 'INSERT INTO users (username, password) VALUES (?, ?)';

  db.query(q, [username, hashed], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json('Vartotojas sukurtas!');
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  const q = 'SELECT * FROM users WHERE username = ?';

  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json('Nėra tokio vartotojo');

    const isPasswordCorrect = bcrypt.compareSync(password, data[0].password);
    if (!isPasswordCorrect) return res.status(400).json('Neteisingas slaptažodis');

    const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: data[0].id, username: data[0].username } });
  });
};

module.exports = { register, login };
