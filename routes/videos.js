const data = require("../data/videos.json");

const express = require("express");

// We are using router here to manage the endpoint.
const router = express.Router();

// Notice how we use "router.get" instead of "app.get"
// req= What's calling the api endpoint. res= the message.
// HTTP method: "GET"
router.get("/videos", (req, res) => {
  res.send(data);
});

// This is an http method called "POST"
// we are making an endpoint for the client to give us data.
router.post("/videos", (req, res) => {
  // we are expecting a title and description.
  const { title, description } = req.body; //payload from client.

  // The data we get from the client, we push it to the data file. ("../data/videos.json"))
  data.push({ title, description }); //problem: it is not persistent (it doesn't save in the physical file)
  // This sends a response to the client.
  res.send({ title, description });
});

router.get("/videos/:id", (req, res) => {
  const { id } = req.params;
  // This is looping through the data array, and finding video.id. if it equals
  // the id, it stores it to video_detail.
  const video_detail = data.find((video) => video.id === id);
  // This is checking if video_detail is empty. If empty, response is "Video not found"
  // It's here because it ends the function here if it's empty.
  if (!video_detail) return res.send("Video not found");

  res.send(video_detail);
});

// This is how we export modules.
module.exports = router;
