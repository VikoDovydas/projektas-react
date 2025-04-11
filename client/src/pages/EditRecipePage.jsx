import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/recipes')
      .then(res => {
        const recipe = res.data.find(r => r.id === parseInt(id));
        if (recipe) {
          setTitle(recipe.title);
          setDescription(recipe.description);
        }
      })
      .catch(err => console.error('Klaida gaunant receptą:', err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/recipes/${id}`, {
        title,
        description
      });
      setMessage('Receptas atnaujintas!');
      navigate('/recipes');
    } catch (err) {
      setMessage('Klaida atnaujinant receptą');
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Redaguoti receptą</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
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
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Atnaujinti
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}

export default EditRecipePage;
