import { createContext, useContext, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(login_name, password) {
    const u = await api('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ login_name, password })
    });
    setUser(u);
  }

  async function logout() {
    await api('/admin/logout', { method: 'POST' });
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
