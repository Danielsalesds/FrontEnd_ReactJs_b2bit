import style from './home.module.css';
import imgTest from './imgTest.png';


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../services/authService';
import { User } from '../../types/User';

export function HomeForm() {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const profile = await getProfile(token);
        setUser(profile);
      } catch (err) {
        // token inválido -> voltar pra login
        localStorage.removeItem('token');
        navigate('/');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [navigate]);

  function Logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    
    navigate('/');
  }

  if (loading) return <p>Carregando...</p>;

  return (
        <div className={style.pageContainer}>
            <div className={style.navbar}>
                <button className={style.logoutBtn} onClick={Logout}>
                    Logout
                </button>
            </div>

            <div className={style.homeFormContainer}>
            <h1 className={style.h1Picture}>Profile picture</h1>
            <img
                src={user?.avatar.high || imgTest}
                alt="imgperfil"
                className={style.imgHome}
            />

            <label className={style.homeFormLable}>
                Your <strong>Name</strong>
            </label>
            <input
                type="text"
                className={style.homeFormInput}
                value={user?.name || ""}
                readOnly
            />

            <label className={style.homeFormLable}>
                Your <strong>E-mail</strong>
            </label>
            <input
                type="text"
                className={style.homeFormInput}
                value={user?.email || ""}
                readOnly
            />
            </div>
        </div>
    );

}
