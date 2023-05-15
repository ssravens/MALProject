const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8081;

app.use(cors());

// Route for fetching top 5 favourite anime of a user
app.get('/api/anime/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const response = await axios.get(`https://api.jikan.moe/v4/users/${username}/favorites`);

    // Check if the response data contains an 'anime' array
    if (response.data.data.anime && response.data.data.anime.length > 0) {
      const topFiveAnime = response.data.data.anime.slice(0, 5);
      res.json(topFiveAnime);
    } else {
      res.status(404).json({ message: 'Favourite anime not found for this user.' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
