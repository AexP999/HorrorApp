import { useCallback, useEffect, useState } from 'react';

export default function UseFetch (url) {
  const [ films, setFilms ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  // const [ error, setError ] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${ url }`);
      const result = await response.json();

      setFilms(result);
    } catch(e) {
      console.log('Ошибка загрузки заданий', e);
    }
    setIsLoading(false);
  }, [ url ]);

  useEffect(() => {
    fetchData();
  }, [ fetchData, url ]);

  return { isLoading, films };
}
