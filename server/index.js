"use strict";
const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cors = require("cors");

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
  getMessage,
  addConversation,
  getConversations,
  getSpecificConversation,
  getMessagesByConversationId,
} = require("./handler");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(morgan("tiny"));
app.use(express.static("./server/assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));

/// REST endpoints
app.post("/api/addNewPost", upload.single("file"), addNewPost);
app.post("/api/addProfileImage", upload.single("file"), addProfileImage);
app.post("/api/addBackgroundImage", upload.single("file"), addBackgroundImage);
app.patch("/api/updateProfileImage", upload.single("file"), updateProfileImage);
app.patch(
  "/api/updateBackgroundImage",
  upload.single("file"),
  updateBackgroundImage
);
app.get("/image/:key", getImage);
app.post("/api/addUser", addUser);
app.post("/api/signIn", signIn);
app.get("/api/getUser/:id", getUser);
app.get("/api/getAllPostButYours/:userId/:service", getAllPostButYours);
app.patch("/api/updateUserInfo", upload.single("file"), updateUserInfo);
app.post("/api/sendMessage", upload.single("file"), sendMessage);
app.get("/api/getMessage/:userId", getMessage);
app.post("/api/addConversation", upload.single("file"), addConversation);
app.get("/api/getConversations/:userId", getConversations);
app.post(
  "/api/getSpecificConversation",
  upload.single("file"),
  getSpecificConversation
);
app.patch("/api/deleteMessage", upload.single("file"), deleteMessage);
app.get(
  "/api/getMessagesByConversationId/:conversationId",
  getMessagesByConversationId
);

app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

const server = app.listen(PORT, () => console.info(`listen on port ${PORT}`));

const socket = require("socket.io");

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addSocketUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    userId !== null &&
    users.push({ userId, socketId });
};

const removeSocketUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getSocketUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addSocketUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ conversationId, senderId, receiverId, text }) => {
    const user = getSocketUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        conversationId,
        receiverId,
        senderId,
        text,
      });
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeSocketUser(socket.id);
    io.emit("getUsers", users);
  });
});
