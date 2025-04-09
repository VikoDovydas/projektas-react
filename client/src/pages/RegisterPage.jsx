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
    <div>
      <h2>Registracija</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Vartotojo vardas" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Slaptažodis" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Registruotis</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default RegisterPage;
