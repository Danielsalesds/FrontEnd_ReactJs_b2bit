// src/services/api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.homologation.cliqdrive.com.br',
  headers: { 
    Accept: 'application/json;version=v1_web',
    'Content-Type': 'application/json'
  }
});
// Adicionando token antes da requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Tratando erros globalmente na resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // redirecionar para login ou limpar token
      console.log('Não autorizado');
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

