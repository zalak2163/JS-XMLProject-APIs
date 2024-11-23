const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const port = 3000;

// Set up Pug view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Define the route to fetch data and render the home page
app.get("/", async (req, res) => {
  try {
    // Example API call to fetch data (you can replace this with the actual API you need)
    const testApiURL = "https://jsonplaceholder.typicode.com/todos";

    // Fetch data from the API
    const response = await axios.get(testApiURL);

    // Render the home page with fetched data
    res.render("home", {
      title: "Test API Response", // Title for the page
      apiData: response.data, // Passing the data fetched from API
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("Error fetching data from APIs");
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
