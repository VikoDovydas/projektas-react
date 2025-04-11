import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddRecipePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://localhost:3001/api/recipes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/recipes');
    } catch (err) {
      console.error('Klaida pridedant receptą:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Pridėti naują receptą</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Pavadinimas"
          className="w-full border px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Aprašymas"
          className="w-full border px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Pridėti
        </button>
      </form>
    </div>
  );
}

export default AddRecipePage;
