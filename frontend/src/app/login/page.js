'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = isRegister
        ? await authApi.register({ name, email, password })
        : await authApi.login({ email, password });

      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <main style={{ maxWidth: 360, margin: '80px auto', padding: 20 }}>
      <h1 style={{ color: '#d92d43' }}>Canvasly</h1>
      <h2>{isRegister ? 'Create account' : 'Log in'}</h2>

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div style={{ marginBottom: 15 }}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: 8 }}
            />
          </div>
        )}
        <div style={{ marginBottom: 10 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" style={{ width: '100%', padding: 10, marginTop: 15, color: '#d92d43' }}>
          {isRegister ? 'Register' : 'Log in'}
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button type="button" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Log in' : 'Register'}
        </button>
      </p>
    </main>
  );
}