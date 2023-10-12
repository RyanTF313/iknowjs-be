const User = require("../models/UserSchema");
const Media = require("../models/MediaSchema");
const Project = require("../models/ProjectSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const jwtSecret = require("crypto").randomBytes(35).toString("hex") // creates a 35 bit string for jwt tokens
const jwtSecret =
  "0d6100220f41af02a8f8796995ec1d765425cabf37bd401665949fd04347b7a205818c";

module.exports = {
  register: async (req, res) => {
    const { username, password, role, email } = req.body;
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password less than 6 characters" });
    }
    try {
      bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
          username,
          password: hash,
          role,
          email,
        }).then((user) => {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, username, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          res.status(200).json({
            message: "User successfully created",
            user,
          });
        });
      });
    } catch (err) {
      res.status(401).json({
        message: "User not successful created",
        error: error.mesage,
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      await User.findOne({ _id: id })
        .then((user) => {
          res.status(200).json({
            message: "User successfully found",
            user,
          });
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
    } catch (error) {
      res.status(401).json({
        message: "User not found",
        error: error.mesage,
      });
    }
  },
  getAllUsers: async (_, res) => {
    try {
      await User.findOne({})
        .then((users) => {
          res.status(200).json({
            message: "Users successfully found",
            users,
          });
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
    } catch (error) {
      res.status(401).json({
        message: "Users not found",
        error: error.mesage,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        res.status(401).json({
          message: "Login not successful. Invalid Credentials",
          error: "User not found",
        });
      } else {
        bcrypt.compare(password, user.password).then(function (result) {
          if (result) {
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign(
              { id: user._id, username, role: user.role },
              jwtSecret,
              {
                expiresIn: maxAge, // 3hrs in sec
              }
            );
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: maxAge * 1000, // 3hrs in ms
            });
            res.status(201).json({
              message: "User successfully Logged in",
              user: user._id,
            });
          } else {
            res.status(400).json({ message: "Login not succesful" });
          }
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      });
    }
  },
  logout: async (_, res) => {
    res.cookie("jwt", "", { maxAge: "1" });
    res.status(201).json({ message: "User successfully Logged out" });
  },
  updateRole: async (req, res) => {
    try {
      const { id, role } = req.body;
      await User.findById(id).then((user) => {
        if (user.role !== role) {
          user.role = role;
          user
            .save()
            .then((user) =>
              res.status(201).json({ message: "Update successful", user })
            )
            .catch((err) =>
              res
                .status(400)
                .json({ message: "An error occurred", error: err.message })
            );
        } else {
          res.status(400).json({ message: "User is already an " + role });
        }
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { media, projects, id } = req.body;
      const user = await User.findById(id);
      if (user) {
        media.forEach(async (mediaData) => await Media.create(mediaData));
        projects.forEach(async (project) => await Project.create(project));
        await User.findOneAndUpdate({ _id: id }, { $set: req.body }, {new: true}).then(
          async (user) => {
            await user
              .save()
              .then((update) => {
                res
                  .status(201)
                  .json({ message: "Update successful", user: update });
              })
              .catch((err) =>
                res
                  .status(400)
                  .json({ message: "An error occurred", error: err.message })
              );
          }
        );
      } else {
        res.status(400).json({ message: "User does not exist" });
      }
    } catch (error) {}
  },
  deleteUser: async (req, res, next) => {
    const { id } = req.body;
    await User.findOneAndDelete(id)
      .then((user) =>
        res.status(201).json({ message: "User successfully deleted", user })
      )
      .catch((error) =>
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message })
      );
  },
};
