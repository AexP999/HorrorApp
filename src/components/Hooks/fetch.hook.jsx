import { useState, useCallback } from 'react';

export const useFetchHook = () => {
  const [ loading, setLoading ] = useState(false);

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    try {
      if(body) {
        body = JSON.stringify(body);
        headers[ 'Content-Type' ] = 'application/json';
      }
      const response = await fetch(url, { method, body, headers });
      const result = await response.json();

      console.log('Операция успешна', JSON.stringify(result));
      setLoading(false);
      return result;
    } catch(error) {
      console.error('Ошибка загрузки заданий', error);
      setLoading(false);
    }
  }, []);

  return { loading, request };
};