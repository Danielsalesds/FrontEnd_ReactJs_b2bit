import styles from './homeForm.module.css';
import logo from '../images/logo.png'

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // se você usa react-router
import { login } from '../services/authService';
export function LoginForm() {
  const navigate = useNavigate(); // para redirecionar
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Preencha e-mail e senha.');
      return;
    }

    setLoading(true);
    try {
      const { raw, token } = await login(email, password);
      console.log('Login bem-sucedido! Token:', token);
      if (!token) {
        const msg = raw?.message || raw?.detail || 'Resposta sem token';
        throw new Error(msg);
      }
      // salva token (localStorage)
      localStorage.setItem('access_token', token);
      // opcional: salvar usuário se vier no raw
      if (raw?.user) localStorage.setItem('user', JSON.stringify(raw.user));

      // redireciona para a rota /home
      navigate('/home');
    } catch (err) {
        if (err instanceof Error) {
            console.error('Falha no login:', err.message);
            setError(err.message);
        } else {
            console.error('Erro desconhecido:', err);
            setError('Erro ao logar');
        }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.loginFormContainer}>
      <img src={logo} alt="" className={styles.loginFormLogo} />
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <label className={styles.loginFormLabel}>E-mail:</label>
        <input
          type="text"
          name="email"
          placeholder="    @gmail.com"
          className={styles.loginFormInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={styles.loginFormLabel}>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="    ************"
          className={styles.loginFormInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className={styles.loginFormButton} disabled={loading}>
          {loading ? 'Entrando...' : 'Sign In'}
        </button>

        {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
      </form>
    </div>
  );
}
