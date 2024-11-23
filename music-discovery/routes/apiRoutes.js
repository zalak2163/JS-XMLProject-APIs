const express = require("express");
const axios = require("axios");
const app = express();

// Setting up view engine as Pug
app.set("view engine", "pug");
app.set("views", "./views");

// MusicBrainz API URL (base URL)
const MUSICBRAINZ_ARTIST = "https://musicbrainz.org/ws/2/artist/";

// Example of how you fetch data from MusicBrainz API
app.get("/", async (req, res) => {
  try {
    // Your static tracks data (do not modify this part)
    const tracks = [
      { title: "delectus aut autem", artist: "undefined" },
      { title: "quis ut nam facilis et officia qui", artist: "undefined" },
      { title: "fugiat veniam minus", artist: "undefined" },
      { title: "et porro tempora", artist: "undefined" },
      // ... More tracks
    ];

    // MusicBrainz artist ID (example)
    const artistId = "b165c467-6825-4de7-8a9b-2c660a78f62e"; // Replace with actual artist ID
    const artistUrl = `${MUSICBRAINZ_ARTIST}${artistId}?fmt=json`;

    // Fetch artist data from MusicBrainz
    const artistResponse = await axios.get(artistUrl);
    const artistData = artistResponse.data;

    // Log artist data to see structure (optional)
    console.log(artistData);

    // Send data to Pug view
    res.render("home", {
      title: "Music Discovery App",
      tracks: tracks, // Pass the static tracks data
      artistData: artistData, // Pass the MusicBrainz artist data
    });
  } catch (error) {
    console.error("Error fetching data from MusicBrainz API:", error.message);
    res.status(500).send("Error fetching data from MusicBrainz API");
  }
});

// Set the server to listen on a port
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
