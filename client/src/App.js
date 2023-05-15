import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const [triggerSearch, setTriggerSearch] = useState(false);

  useEffect(() => {
    const searchFavorites = async () => {
      if(username === '') return;
      try {
        const response = await axios.get(`http://localhost:8081/api/anime/${username}`);
        setAnimeList(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    if (triggerSearch) {
      searchFavorites();
      setTriggerSearch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTriggerSearch(true);
  };

  return (
    <div className="App">
      <h1>MAL Top 5 Favourites Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter MAL username"
        />
        <button type="submit">Search</button>
      </form>
      
      <div className="anime-container">
        {animeList.map(anime => (
          <div key={anime.mal_id} className="anime-card">
            <a href={anime.url} target="_blank" rel="noopener noreferrer">
              <img src={anime.images.jpg.large_image_url} alt={anime.title} />
            </a>
            <h2>{anime.title}</h2>
            <p>Type: {anime.type}</p>
            <p>Start Year: {anime.start_year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
