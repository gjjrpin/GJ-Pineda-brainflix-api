// THIS BOILER PLATE WAS FROM https://www.npmjs.com/package/express

// require is similar to import
const express = require("express");
// app is a lot like the server itself.
// app is the highest level.
const app = express();
const port = 3000;
// require is similar to import
const videos_route = require("./routes/videos.js");

// used to parse/read x-www-form...
app.use(express.urlencoded({ extended: false }));
// used to parse/read json
app.use(express.json());
app.use(videos_route);

// This is essentially running the whole server.
// ALWAYS HAVE THIS AT THE BOTTOM.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
