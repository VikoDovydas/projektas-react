import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddRecipePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/recipes', {
        title,
        description
      });
      setMessage('Receptas pridėtas!');
      // galima automatiškai grįžti į sąrašą
      navigate('/recipes');
    } catch (err) {
      setMessage('Klaida pridedant receptą');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Pridėti naują receptą</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pavadinimas"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Aprašymas"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <button type="submit">Pridėti</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default AddRecipePage;
