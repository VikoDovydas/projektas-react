import { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', {
        username,
        password
      });
      setMessage('Prisijungimas sėkmingas! Sveikas, ' + res.data.user.username);
      // Čia gali saugoti tokeną: localStorage.setItem('token', res.data.token);
    } catch (err) {
      setMessage('Klaida prisijungiant');
    }
  };

  return (
    <div>
      <h2>Prisijungimas</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Vartotojo vardas" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Slaptažodis" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Prisijungti</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default LoginPage;
