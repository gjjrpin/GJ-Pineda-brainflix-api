// THIS BOILER PLATE WAS FROM https://www.npmjs.com/package/express
// cors allows us to whitelist URLS
const cors = require("cors");
// require is similar to import
const express = require("express");
// app is a lot like the server itself.
// app is the highest level.
const app = express();
const port = 3000;
// require is similar to import
const videos_route = require("./routes/videos.js");

// cors location matters. Make sure it's at the top
app.use(
  cors({
    // This is whitelisting to allow localhost.
    // If you specify a specific website ex. gj.com, you'll need to change the
    // asterisk to gj.com for the backend to work with it.
    // If you put gj.com there, only gj.com can access this backend.
    origin: "*",
  })
);

// used to parse/read x-www-form...
app.use(express.urlencoded({ extended: false }));
// used to parse/read json
app.use(express.json());
//This is linked to the photos
// This allows us to use absolute path
app.use(express.static("public"));

app.use(videos_route);

// This is essentially running the whole server.
// ALWAYS HAVE THIS AT THE BOTTOM.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
