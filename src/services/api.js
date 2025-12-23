const BASE = 'http://localhost:3001';

export async function api(path, options = {}) {
  const res = await fetch(BASE + path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  if (res.status === 401) throw new Error('UNAUTHORIZED');
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
