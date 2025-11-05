import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE } from '../../config';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// attach token before each request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
