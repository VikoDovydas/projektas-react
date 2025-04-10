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
      await axios.post('http://localhost:3001/api/recipes', { title, description });
      setMessage('Receptas pridėtas!');
      navigate('/recipes');
    } catch (err) {
      setMessage('Klaida pridedant receptą');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Pridėti naują receptą</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Pavadinimas"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Aprašymas"
            className="w-full border rounded px-3 py-2 h-32 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-4 w-full rounded hover:bg-purple-700 transition"
          >
            Pridėti
          </button>
        </form>
        {message && <p className="text-sm text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default AddRecipePage;
