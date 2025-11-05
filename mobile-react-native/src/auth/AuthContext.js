import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { API_BASE } from '../../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // load token from storage on startup
    (async () => {
      try {
        const t = await AsyncStorage.getItem('@auth_token');
        if (t) setToken(t);
      } catch (e) {
        console.warn('Failed to load token', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    const resp = await axios.post(`${API_BASE}/login`, { email, password });
    // assume response { token: "..." }
    const t = resp.data.token;
    setToken(t);
    await AsyncStorage.setItem('@auth_token', t);
    return t;
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem('@auth_token');
  };

  return (
    <AuthContext.Provider value={{ token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
