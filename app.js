// THIS BOILER PLATE WAS FROM https://www.npmjs.com/package/express

const body_parser = require("body-parser");

// require is similar to import
const express = require("express");
// app is a lot like the server itself.
// app is the highest level.
const app = express();
const port = 3000;
// require is similar to import
const videos_route = require("./routes/videos.js");

app.use(express.json());
// used to parse/read x-www-form...
app.use(body_parser.urlencoded({ extended: false }));
// used to parse/read json
app.use(body_parser.json());
app.use(videos_route);

// This is essentially running the whole server.
// ALWAYS HAVE THIS AT THE BOTTOM.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
