// http://localhost:3000/videos THIS IS HOW YOU ACCESS BACKEND.

//const data = require("../data/videos.json");
// This is fs (file system). It is being used to have the computer modify a file.
// In our case, we are modifying out videos.json
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
router.get("/test", (req, res) => {
  // --------------------------------------------------------
  res.send("working");
});
// -----------------GET /VIDEOS---------------------------------------
// Notice how we use "router.get" instead of "app.get"
// req= What's calling the api endpoint. res= the message.
// HTTP method: "GET"
router.get("/videos", (req, res) => {
  // Uncomment the console log to see where the api key is coming from.
  // console.log(req.query);

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
  const { title, channel, description } = req.body; //payload from client.

  // 1. Read file
  // json.parse turns videos from string to JSON.
  // with that, we are able to push data into it. The data we are pushing is in #2.
  // utf8 is the type of characters stored in the json file. (English)
  const videos = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/videos.json"), "utf8")
  );

  // 2. create new data
  // This is the data received from the front end.
  // we are pushing the newVideos object to #3.
  const newVideo = {
    id: uuidv4(),
    title: title,
    channel: channel,
    // This will set a random image
    image: `/assets/image${Math.floor(Math.random() * 9)}.jpeg`,
    description: description,
    views: "1,000,000",
    likes: "999",
    duration: "99",
    video: "",
    timestamp: new Date().valueOf(),
    comments: [
      {
        id: uuidv4(),
        name: "Grace Pineda",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!",
        likes: 999,
        timestamp: new Date().valueOf(),
      },
      {
        id: uuidv4(),
        name: "Joel Pineda",
        comment:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat!",
        likes: 999,
        timestamp: new Date().valueOf(),
      },
    ],
  };

  // The data we get from the client, we push it to the data file. ("../data/videos.json"))
  // 3. Modify file.
  videos.push(newVideo);
  // This is stringify because by default fs.writeFile requires a string.
  const updated_videos = JSON.stringify(videos);

  // 4. Override old file (save)
  //This is where we are writing it.
  fs.writeFileSync(
    // This is the absolute path to videos.json.
    path.resolve(__dirname, "../data/videos.json"),
    // This is the payload.
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
// ----------------THIS IS FOR ADDING COMMENTS----------------------------------------
router.post("/videos/:id/comments", (req, res) => {
  const { id } = req.params;
  // This gets name and comment from the body
  const { name, comment } = req.body;

  const videos = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/videos.json"), "utf8")
  );

  const newComment = {
    id: uuidv4(),
    name: name,
    comment: comment,
    likes: 0,
    // valueOf() sorts it to the top. for some reason... Turns it to unix time.
    timestamp: new Date().valueOf(),
  };

  videos.map((video) => {
    if (video.id === id) {
      video.comments.push(newComment);
    }
  });

  fs.writeFileSync(
    // This is the absolute path to videos.json.
    path.resolve(__dirname, "../data/videos.json"),
    // This is the payload.
    JSON.stringify(videos)
  );

  res.send(newComment);
});

// ----------------THIS IS FOR DELETING COMMENTS----------------------------------------

router.delete("/videos/:videoId/comments/:commentId", (req, res) => {
  const { videoId, commentId } = req.params;

  const videos = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/videos.json"), "utf8")
  );

  // This keeps track of the old comment. Finds a specific video and finds the
  // specific comment after.
  const oldComment = videos
    .find((video) => video.id === videoId)
    .comments.find((comment) => comment.id === commentId);

  // This filters through the video id. When it finds the video id,
  // it modifies it with filter. It removes the commentId we receive.
  // once modified, it stores it back to videos.
  videos.map((video) => {
    if (video.id === videoId) {
      video.comments = video.comments.filter(
        (comment) => comment.id !== commentId
      );
    }
  });

  fs.writeFileSync(
    // This is the absolute path to videos.json.
    path.resolve(__dirname, "../data/videos.json"),
    // This is the payload.
    JSON.stringify(videos)
  );
  // console.log(oldComment);
  res.send(oldComment);
});

// This is how we export modules.
module.exports = router;
