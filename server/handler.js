const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const bcrypt = require("bcrypt");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const { uploadFile, getFileStream } = require("./s3");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("animalCare");

    const checkEmail = await db.collection("users").findOne({ email: email });

    if (!checkEmail) {
      const result = await db.collection("users").insertOne({
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
      });

      client.close();

      res.status(200).json({
        status: 200,
        id: result.insertedId,
        message: `User successfully added!`,
      });
    } else {
      res.status(409).json({
        status: 409,
        message: "This email address already exixsts!",
      });
    }
    client.close();
  } catch (err) {
    console.log("Error: ", err);
  }
};

const signIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("animalCare");
    const result = await db.collection("users").findOne({ email: email });

    if (result) {
      const match = await bcrypt.compare(password, result.password);
      if (match) {
        res.status(200).json({
          status: 200,
          id: result._id,
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "Password is incorrect!",
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        message: "We cannot find an account with that e-mail address!",
      });
    }
    client.close();
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { id } = req.params;

  try {
    await client.connect();
    const db = client.db("animalCare");
    const result = await db.collection("users").findOne({ _id: ObjectId(id) });
    if (result) {
      res.status(200).json({
        status: 200,
        message: "User found!",
        data: result,
      });
    }
    client.close();
  } catch (err) {
    console.log("Error :", err);
  }
};

const addNewPost = async (req, res) => {
  const file = req.file;

  const result = await uploadFile(file);
  await unlinkFile(file.path);

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const petName = req.body.petName;
    const petAge = req.body.petAge;
    const yearOrMonth = req.body.yearOrMonth;
    const petType = req.body.petType;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const service = req.body.service;
    const description = req.body.description;
    const userId = req.body.userId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const profileImage = req.body.profileImage;

    const petData = {
      description: description,
      petName: petName,
      petAge: petAge,
      yearOrMonth: yearOrMonth,
      petType: petType,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
      service: service,
      image: result.key,
      userId: userId,
      user: {
        id: userId,
        firstName: firstName,
        lastName: lastName,
        username: username,
        profileImage: profileImage,
      },
    };

    const db = client.db("animalCare");
    const finalResult = await db.collection("allPosts").insertOne(petData);
    client.close();
    if (finalResult) {
      const user = await db
        .collection("users")
        .findOne({ _id: ObjectId(userId) });
      if (user) {
        await db
          .collection("users")
          .updateOne({ _id: ObjectId(userId) }, { $push: { posts: petData } });
        res.status(200).json({
          status: 200,
          userId: userId,
          post: petData,
          message: "New post successfully added!",
        });
      }
    }
    client.close();
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getImage = async (req, res) => {
  try {
    const { key } = await req.params;
    const readStream = getFileStream(key);
    await readStream.pipe(res);
  } catch {
    return res.status(404);
  }
};

const addProfileImage = async (req, res) => {
  const file = req.file;

  const result = await uploadFile(file);
  await unlinkFile(file.path);

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const userId = req.body.userId;

    const db = client.db("animalCare");

    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(userId) });

    if (user) {
      await db
        .collection("users")
        .updateOne(
          { _id: ObjectId(userId) },
          { $set: { profileImage: result.key } }
        );
      res.status(200).json({
        status: 200,
        userId: userId,
        profileImage: result.key,
        message: "Profile image successfully added!",
      });
    }
    client.close();
  } catch (err) {
    console.log("Error: ", err);
  }
};

const addBackgroundImage = async (req, res) => {
  const file = req.file;

  const result = await uploadFile(file);
  await unlinkFile(file.path);

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const userId = req.body.userId;

    const db = client.db("animalCare");

    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(userId) });

    if (user) {
      await db
        .collection("users")
        .updateOne(
          { _id: ObjectId(userId) },
          { $set: { backgroundImage: result.key } }
        );
      res.status(200).json({
        status: 200,
        userId: userId,
        backgroundImage: result.key,
        message: "Background image successfully added!",
      });
    }
    client.close();
  } catch (err) {
    console.log("Error: ", err);
  }
};

const updateProfileImage = async (req, res) => {
  const file = req.file;

  const result = await uploadFile(file);
  await unlinkFile(file.path);

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const userId = req.body.userId;

    const db = client.db("animalCare");

    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(userId) });

    if (user) {
      await db
        .collection("users")
        .updateOne(
          { _id: ObjectId(userId) },
          { $set: { profileImage: result.key } }
        );
      res.status(200).json({
        status: 200,
        userId: userId,
        profileImage: result.key,
        message: "Background image successfully updated!",
      });
    }
    client.close();
  } catch (err) {
    console.log("Error: ", err);
  }
};

const updateBackgroundImage = async (req, res) => {
  const file = req.file;

  const result = await uploadFile(file);
  await unlinkFile(file.path);

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const userId = req.body.userId;

    const db = client.db("animalCare");

    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(userId) });

    if (user) {
      await db
        .collection("users")
        .updateOne(
          { _id: ObjectId(userId) },
          { $set: { backgroundImage: result.key } }
        );
      res.status(200).json({
        status: 200,
        userId: userId,
        backgroundImage: result.key,
        message: "Background image successfully updated!",
      });
    }
    client.close();
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getAllPostButYours = async (req, res) => {
  const { userId } = req.params;
  const { service } = req.params;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("animalCare");

    const allPosts = await db.collection("allPosts").find().toArray();
    const allPostsButYours = allPosts.filter((post) => {
      if (post.user.id !== userId) {
        if (service === "Day-Care") {
          return post.service === "Day-Care";
        } else if (service === "House-Visit") {
          return post.service === "House-Visit";
        } else if (service === "Pet-Walk") {
          return post.service === "Pet-Walk";
        } else if (service === "All") {
          return post;
        }
      }
    });

    res.status(200).json({
      status: 200,
      data: allPostsButYours,
      message: "All post exept yours received",
    });
    client.close();
  } catch (err) {
    console.log("Error: ", err);
  }
};

const updateUserInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const info = req.body.info;
    const userId = req.body.userId;

    const db = client.db("animalCare");

    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(userId) });

    if (user) {
      await db
        .collection("users")
        .updateOne({ _id: ObjectId(userId) }, { $set: { info: info } });

      res.status(200).json({
        status: 200,
        userId: userId,
        info: info,
        message: "UserInfo successfully updated!",
      });
    }
    client.close();
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = {
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
};
