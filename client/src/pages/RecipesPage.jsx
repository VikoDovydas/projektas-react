import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react'; // jei nori ikonos, įsidiek `lucide-react`

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error('Klaida gaunant receptus:', err));
  }, []);

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
            <div key={recipe.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-medium text-gray-900">{recipe.title}</h3>
              <p className="text-sm text-gray-700 mt-1">{recipe.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipesPage;
