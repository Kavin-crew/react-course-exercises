import React, { useEffect, useState } from 'react';
import StarRating from './StartRating';
import toast, { Toaster } from 'react-hot-toast';

const average = arr =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = '4a287b95';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId(selectedId => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie]);
  }

  function handDeleteWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  useEffect(
    function () {
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

      handleCloseMovie();
      fecthMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Toaster />
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCLoseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span role="button" aria-label="stop icon">
        ⛔
      </span>
      {message}
    </p>
  );
}

// structural component
function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
// statefull component
function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  );
}
// stateless/presentation
function Logo() {
  return (
    <div className="logo">
      <span role="img" aria-label="popcorn icon">
        🍿
      </span>
      <h1>usePopcorn</h1>
    </div>
  );
}
// stateless/presentation
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
// structural component
function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen(open => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map(movie => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
// stateless/presentation
function Movie({ movie, onSelectMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ selectedId, onCLoseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);

  // console.log(watched[0].userRating); //equivalent of the find method below
  const watchedUserRating = watched.find(
    movie => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      // useEffect cleaning function
      return function () {
        document.title = 'usePopcorn';
      };
    },
    [title]
  );

  useEffect(
    function () {
      function EscKey(e) {
        if (e.code === 'Escape') {
          onCLoseMovie();
        }
      }

      document.addEventListener('keydown', EscKey);

      return function () {
        document.removeEventListener('keydown', EscKey);
      };
    },
    [onCLoseMovie]
  );

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCLoseMovie();
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button onClick={onCLoseMovie} className="btn-back">
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size="24"
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated the movie with {watchedUserRating} <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

// stateless/presentation
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map(movie => movie.imdbRating));
  const avgUserRating = average(watched.map(movie => movie.userRating));
  const avgRuntime = average(watched.map(movie => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span role="img" aria-label="number sign">
            #️⃣
          </span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span role="img" aria-label="star ratings">
            ⭐️
          </span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span role="img" aria-label="overall star ratings">
            🌟
          </span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span role="img" aria-label="time icon">
            ⏳
          </span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
// stateless/presentation
function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map(movie => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
// stateless/presentation
function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span role="img" aria-label="star rating">
            ⭐️
          </span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span role="img" aria-label="overall star rating">
            🌟
          </span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span role="img" aria-label="time icon">
            ⏳
          </span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          <span role="button" aria-label="delete">
            ❌
          </span>
        </button>
      </div>
    </li>
  );
}
