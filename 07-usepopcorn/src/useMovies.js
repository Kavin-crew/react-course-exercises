import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const KEY = '4a287b95';

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function () {
      //   callback?.();

      const controller = new AbortController();

      async function fecthMovies() {
        try {
          setIsLoading(true);
          setError('');

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          const data = await res.json();

          if (!res.ok)
            throw new Error('Something went wrong with fetching movies');

          if (data.Response === 'False') throw new Error('Movie not found');

          setMovies(data.Search);
          setError('');
        } catch (error) {
          if (error.name !== 'AbortError') {
            setError(error.message);
            toast.error(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }

      //   handleCloseMovie();
      fecthMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
