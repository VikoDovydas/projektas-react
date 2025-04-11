import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error('Klaida gaunant receptus:', err));
  }, []);

  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/recipes/${id}`);
      setRecipes(recipes.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Klaida trinant receptą:', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">🍽️ Receptų sąrašas</h2>
        <Link to="/add">
          <button className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 text-sm rounded hover:bg-gray-300 transition">
            <Plus size={16} /> Pridėti
          </button>
        </Link>
      </div>

      {recipes.length === 0 ? (
        <p className="text-gray-600">Šiuo metu receptų nėra.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <div key={recipe.id} className="relative bg-white p-4 rounded-lg shadow hover:shadow-md transition">
              {recipe.image && (
                <img
                  src={`http://localhost:3001${recipe.image}`}
                  alt={recipe.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h3 className="text-xl font-medium text-gray-900">{recipe.title}</h3>
              <p className="text-sm text-gray-700 mt-1">{recipe.description}</p>

              {/* Ištrynimo mygtukas */}
              <button
                onClick={() => deleteRecipe(recipe.id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                🗑️
              </button>

              {/* Redagavimo mygtukas */}
              <Link
                to={`/edit/${recipe.id}`}
                className="absolute bottom-2 right-2 text-blue-600 hover:text-blue-800"
              >
                ✏️
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipesPage;
