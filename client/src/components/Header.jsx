import { Link } from 'react-router-dom';



function Header() {
  return (
    <header className="header">
      <h1>🍽️ Receptų sistema</h1>
      <nav>
        <Link to="/recipes">Receptai</Link>
        <Link to="/add">Pridėti</Link>
        <Link to="/login">Prisijungti</Link>
        <Link to="/register">Registruotis</Link>
      </nav>
    </header>
  );
}

<h1 className="text-4xl text-red-600 font-bold">Testas </h1>



export default Header;
