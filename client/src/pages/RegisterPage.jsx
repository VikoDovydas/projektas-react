import { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/auth/register', {
        username,
        password
      });
      setMessage('Registracija sėkminga! Dabar gali prisijungti.');
    } catch (err) {
      setMessage('Klaida registruojantis');
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Registracija</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Vartotojo vardas"
          className="w-full border rounded px-3 py-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Slaptažodis"
          className="w-full border rounded px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-4 w-full rounded hover:bg-purple-700 transition"
        >
          Registruotis
        </button>
      </form>
      {message && <p className="text-sm text-center mt-4">{message}</p>}
    </div>
  );
}

export default RegisterPage;
