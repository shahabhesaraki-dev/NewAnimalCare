"use strict";
const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  addUser,
  signIn,
  getUser,
  addNewPost,
  getImage,
  addProfileImage,
  addBackgroundImage,
  updateProfileImage,
  updateBackgroundImage,
  getAllPostButYours,
  updateUserInfo,
  sendMessage,
  deleteMessage,
} = require("./handler");

const PORT = process.env.PORT || 5000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })

  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  /// REST endpoints
  .post("/api/addNewPost", upload.single("file"), addNewPost)
  .post("/api/addProfileImage", upload.single("file"), addProfileImage)
  .post("/api/addBackgroundImage", upload.single("file"), addBackgroundImage)
  .patch("/api/updateProfileImage", upload.single("file"), updateProfileImage)
  .patch(
    "/api/updateBackgroundImage",
    upload.single("file"),
    updateBackgroundImage
  )
  .get("/image/:key", getImage)
  .post("/api/addUser", addUser)
  .post("/api/signIn", signIn)
  .get("/api/getUser/:id", getUser)
  .get("/api/getAllPostButYours/:userId/:service", getAllPostButYours)
  .patch("/api/updateUserInfo", upload.single("file"), updateUserInfo)
  .patch("/api/sendMessage", upload.single("file"), sendMessage)
  .patch("/api/deleteMessage", upload.single("file"), deleteMessage)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`listen on port ${PORT}`));
