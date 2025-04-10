import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-red-600">🍽️ Receptų sistema</h1>

      <nav className="space-x-4">
        <Link to="/recipes" className="hover:underline">Receptai</Link>
        <Link to="/add" className="hover:underline">Pridėti</Link>

        {user ? (
          <>
            <span className="text-gray-600">Sveikas, {user.username} 👋</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Atsijungti
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Prisijungti</Link>
            <Link to="/register" className="hover:underline">Registruotis</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
