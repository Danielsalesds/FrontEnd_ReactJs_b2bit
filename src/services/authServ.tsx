import { api} from './api';

export async function login(email:string , password: string) {
  const { data } = await api.post('/auth/login/', { email, password });
  const token = data?.tokens?.access || data?.access_token;
  localStorage.setItem('token', token);
  return data;
}

export async function getProfile() {
  const { data } = await api.get('/auth/profile/');
  return data;
}
