import { useState, useCallback } from 'react';

export const useFetchHook = (url) => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  const clearErrors = () => setError(null);

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {

    setLoading(true);
    try {

      if(body) {
        body = JSON.stringify(body);
        headers[ 'Content-Type' ] = 'application/json';
      }
      const response = await fetch(url, { method, body, headers });
      const result = await response.json();
      console.log('USEFETCHHOOK', response.status);
      console.log('Операция успешна');

      if(!response.ok) {
        throw new Error(result.message || 'Где-то ошибка');
      }

      setLoading(false);
      return result;
    } catch(e) {
      console.log(e);
      setError(e.message);
      setLoading(false);
    }
  }, []);

  return { loading, request, error, clearErrors };
};