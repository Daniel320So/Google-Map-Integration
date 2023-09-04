const express = require("express");
const app = express();
const cors = require('cors');
const port = "8888";
require('dotenv').config()
const apiKey = process.env.VITE_GOOGLE_API;

app.use(cors())

app.get("/getLocation/:latitude/:longitude", async (request, response) => {
  const res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + request.params.latitude + ',' + request.params.longitude + '&key=' + apiKey);
  return response.send(await res.json())
});

app.get("/search/:location", async (request, response) => {
  let results = [];
  const location = request.params.location;
  const url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
  const query = `${location}&key=${apiKey}`;
  await fetch(url + query)
    .then(async (response) => {
      const data = await response.json();
      results = data.results.slice(0, 5);
    });
    console.log(results);
    return response.send(results)
})

//server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});