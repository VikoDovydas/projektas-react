const express = require('express');
const router = express.Router();
const db = require('../db');

// GET
router.get('/', (req, res) => {
  db.query('SELECT * FROM recipes', (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// Add
router.post('/', (req, res) => {
  const { title, description } = req.body;
  const q = 'INSERT INTO recipes (title, description, user_id) VALUES (?, ?, ?)';
  db.query(q, [title, description, 1], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json('Receptas pridėtas!');
  });
});

// Update
router.put('/:id', (req, res) => {
  const { title, description } = req.body;
  const q = 'UPDATE recipes SET title = ?, description = ? WHERE id = ?';
  db.query(q, [title, description, req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json('Receptas atnaujintas!');
  });
});

// Delete
router.delete('/:id', (req, res) => {
  const q = 'DELETE FROM recipes WHERE id = ?';
  db.query(q, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json('Receptas ištrintas!');
  });
});

module.exports = router;
