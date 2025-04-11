import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RecipesPage from './pages/RecipesPage';
import AddRecipePage from './pages/AddRecipePage';
import Layout from './components/Layout';
import EditRecipePage from './pages/EditRecipePage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={
          <h1 className="text-4xl text-red-500 font-bold">Tailwind test </h1>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/add" element={<AddRecipePage />} />
        <Route path="/edit/:id" element={<EditRecipePage />} />

      </Routes>
    </Layout>
  );
}

export default App;
