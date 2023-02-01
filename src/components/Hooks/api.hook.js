import axios from 'axios';
import { useState } from 'react';
import { PATHTO } from '../../constants/constants';

export const useHttpHook = () => {
  const [apiError, setApiError] = useState(null);

  const clearApiErrors = () => setApiError(null);

  const api = axios.create({
    withCredentials: true,
    baseURL: PATHTO.HOST_NAME,
  });

  api.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token');
    return config;
  });

  api.interceptors.response.use(
    (config) => config,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401) {
        try {
          const response = await axios.get(`${PATHTO.HOST_NAME}/auth/refresh`, {
            withCredentials: true,
          });
          localStorage.setItem('token', response.data);
          return api.request(originalRequest);
        } catch (err) {
          console.log('Ошибка авторизации');
        }
      }
      setApiError(error.response.data.message);
    }
  );
  return { api, apiError, clearApiErrors };
};
