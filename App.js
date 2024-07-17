import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';
import './App.css';

// API URL with your API key
const API_URL = 'https://www.omdbapi.com?apikey=f4532191';

const App = () => {
  // State to hold the search term entered by the user
  const [searchTerm, setSearchTerm] = useState("");
  // State to hold the list of movies fetched from the API
  const [movies, setMovies] = useState([]);
  // State to manage the dark mode toggle
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fetch and display movies related to "Batman" when the component mounts
  useEffect(() => {
    searchMovies("Batman");
  }, []);

  /**
   * Function to search for movies based on the provided title.
   * @param {string} title - The title of the movie to search for.
   */
  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
  
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMovies([]);
    }
  };

  /**
   * Function to handle key press events.
   * @param {object} event - The key press event.
   */
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchMovies(searchTerm);
    }
  };

  /**
   * Function to toggle the theme between light and dark mode.
   */
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  /**
   * Function to reset the page to its initial state.
   */
  const resetPage = () => {
    setSearchTerm("");
    searchMovies("Batman");
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <label className="switch">
        <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>

      <h1>Cinema Search</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      <button className="home-button" onClick={resetPage}>Home</button>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
