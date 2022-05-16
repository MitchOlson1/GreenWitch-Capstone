const { User, validateLogin, validateUser } = require("../models/user");
const { Chef, validateChef } = require("../models/chef");
const { Post } = require("../models/post");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

//* POST register a new user
router.post("/register", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send(`Email ${req.body.email} already claimed!`);

    const salt = await bcrypt.genSalt(10);
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      isAdmin: req.body.isAdmin,
    });

    await user.save();
    const token = user.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// POST a valid login attempt
// when a user logs in, a new JWT token is generated and sent if their email/password credentials are correct
router.post("/login", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(`Invalid email or password.`);

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    return res.send(token);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// Get all users
router.get("/", [auth], async (req, res) => {
  try {
    console.log(req.user);
    const users = await User.find();
    return res.send(users);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//GET User by Id
router.get("/:userId", async (req, res) => {
  try {
    const users = await User.findById(req.params.userId);
    return res.send(users);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// Get all chefs
router.get("/:userId/chefs", async (req, res) => {
  try {
    const users = await User.findById(req.params.userId);
    return res.send(users.chef);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//put user chef
//http://localhost:3011/api/users/
router.put("/:userId/newChef",  async (req, res) => {
  try {
    let chef = await User.findById(req.params.userId);
    if (!chef)
      return res
        .status(400)
        .send(`Post with Id of ${req.params.userId} does not exist!`);

    let newChef = new Chef({
      name: req.body.name,
      uID: req.body.uID,
      post: req.body.post,
      dishes: req.body.dishes,


    });
    console.log(newChef);
    chef.chef.push(newChef);
    await chef.save();
    return res.status(201).send(chef);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});


// DELETE a single user from the database
router.delete("/:userId", [auth, admin], async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);
    await user.remove();
    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//PUT add a review/description
router.put("/:userId/review", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);
    let about = await User.findByIdAndUpdate(req.params.userId, req.body);
    return res.send(about);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

//get all posts
router.get("/:userId/posts", async (req, res) => {
  try {
    const users = await User.findById(req.params.userId);
    return res.send(users.post);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

//put user post
//http://localhost:3011/api/users/
router.put("/:userId/newPost",  async (req, res) => {
  try {
    let post = await User.findById(req.params.userId);
    if (!post)
      return res
        .status(400)
        .send(`Post with Id of ${req.params.userId} does not exist!`);

    let newPost = new Post({
      name: req.body.name,
      uID: req.body.uID,
      post: req.body.post
    });
    console.log(newPost);
    post.post.push(newPost);
    await post.save();
    return res.status(201).send(post);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// PUT likes
router.put("/:userId/post/:postId/likes", async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(
          `Could not find any posts with the ID of ${req.params.userId}`
        );

    const post = user.post.id(req.params.postId);
    if (!post) return res.status(400).send(`There is no post.`);
    post.likes++;

    await user.save();
    return res.send(post);
  } catch (error) {
    return res.status(500).send(`internal server errror: ${error}`);
  }
});

// PUT dislikes
router.put("/:userId/post/:postId/dislikes", async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(
          `Could not find any posts with the ID of ${req.params.userId}`
        );

    const post = user.post.id(req.params.postId);
    if (!post) return res.status(400).send(`There is no post.`);
    post.dislikes++;

    await user.save();
    return res.send(post);
  } catch (error) {
    return res.status(500).send(`internal server errror: ${error}`);
  }
});


module.exports = router;
