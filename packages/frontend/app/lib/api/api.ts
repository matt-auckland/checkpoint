// TODO get API_BASE from env
const API_BASE = 'http://localhost:3000';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: any;
  body?: any;
  auth?: boolean;
};

export async function api<T>(
  path: string,
  { method = 'GET', headers = {}, body, auth = true }: RequestOptions = {}
): Promise<T> {
  const url = `${API_BASE}${path}`;

  const finalHeaders = new Headers({
    'Content-Type': 'application/json',
    ...headers,
  });

  if (auth) {
    const token = undefined; //get token from..
    if (token) finalHeaders.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  //TODO on 403 logout from current session
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `API error (${res.status})`);
  }

  return res.json();
}
