//const data = require("../data/videos.json");
const fs = require("fs");

const { v4: uuidv4 } = require("uuid");

const path = require("path");

const express = require("express");

// We are using router here to manage the endpoint.
const router = express.Router();

// These are examples of REST API.
// videos
// GET /videos
// GET /videos/:id
// POST /videos
// PUT /videos/:id
// DELETE /videos/:id

// -----------------GET /VIDEOS---------------------------------------
// Notice how we use "router.get" instead of "app.get"
// req= What's calling the api endpoint. res= the message.
// HTTP method: "GET"
router.get("/videos", (req, res) => {
  // JSON.parse turns everything in the brackets to a JSON file.
  // This needs an absolute path, therefore, we use path.resolve.
  const videos = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/videos.json"), "utf8")
  );
  // console.log(__dirname);
  // console.log(path.resolve(__dirname, "../data/videos.json"));
  // --------------------------------------------------------
  res.send(videos);
});
// ---------------POST /VIDEOS-----------------------------------------
// This is an http method called "POST"
// we are making an endpoint for the client to give us data.
router.post("/videos", (req, res) => {
  // we are expecting a title and description.
  const { title, channel } = req.body; //payload from client.

  // 1. Read file
  const videos = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/videos.json"), "utf8")
  );

  // 2. create new data
  const newVideo = {
    id: uuidv4(),
    title: title,
    channel: channel,
    image: "/assets/image0.jpeg",
  };

  // The data we get from the client, we push it to the data file. ("../data/videos.json"))
  // 3. Modify file.
  videos.push(newVideo);
  const updated_videos = JSON.stringify(videos);

  // 4. Override old file (save)
  //This is where we are writing it.
  fs.writeFileSync(
    path.resolve(__dirname, "../data/videos.json"),
    updated_videos
  );

  // This sends a response to the client.
  // This includes the id this time.
  res.send(newVideo);
});

// --------------GET /VIDEOS/:ID------------------------------------------
router.get("/videos/:id", (req, res) => {
  const { id } = req.params;

  const videos = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/videos.json"), "utf8")
  );

  //we are filtering through the videos here.
  // This is looping through the data array, and finding video.id. if it equals
  // the id, it stores it to video_detail.
  const video_detail = videos.find((video) => video.id === id);
  // This is checking if video_detail is empty. If empty, response is "Video not found"
  // It's here because it ends the function here if it's empty.
  if (!video_detail) return res.send("Video not found");

  res.send(video_detail);
});
// --------------------------------------------------------

// This is how we export modules.
module.exports = router;
