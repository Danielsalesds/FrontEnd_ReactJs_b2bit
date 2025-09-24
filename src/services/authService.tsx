// src/services/authService.js
const API_BASE = 'https://api.homologation.cliqdrive.com.br';
const DEFAULT_HEADERS = {
  Accept: 'application/json;version=v1_web',
  'Content-Type': 'application/json'
};
const DEFAULT_HEADERS_PROFILE= {
  Accept: 'application/json;version=v1_web',
  'Content-Type': 'application/json'
};

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login/`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ email, password })
  });
  console.log('Status login:', res.status);

  if (!res.ok) {
    const body = await res.json().catch(()=>null);
    throw new Error(body?.message || body?.detail || `HTTP ${res.status}`);
  }

  const data = await res.json();
  console.log('Resposta login:', data);
  

  // procura token nos formatos possíveis
  const token =
    data?.access_token ||
    data?.accessToken ||
    data?.token ||
    data?.access ||
    data?.tokens?.access; // 🔑 aqui está o certo

  return { raw: data, token };
  // tenta extrair token nas chaves comuns
   /* if (data.tokens && (data.tokens.access || data.tokens.refresh)) {
    return data;
  } else {
    throw new Error("Resposta sem token");
  }*/
  //const token = data?.access_token || data?.accessToken || data?.token || data?.access;
  //return { raw: data, token };
}
export async function getProfile(token: any) {
  const res = await fetch(`${API_BASE}/auth/profile/`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json;version=v1_web','Content-Type': 'application/json'},
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.message || 'Não autorizado');
  }

  return res.json();
}
