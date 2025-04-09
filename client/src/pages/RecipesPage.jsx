import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function RecipesPage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error('Klaida gaunant receptus:', err));
  }, []);

  return (
    <div>
      <h2>Receptų sąrašas</h2>
      {recipes.length === 0 ? (
        <p>Nėra receptų</p>
      ) : (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

<Link to="/add">
  <button>➕ Pridėti receptą</button>
</Link>

export default RecipesPage;
