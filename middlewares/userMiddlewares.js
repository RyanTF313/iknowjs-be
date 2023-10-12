const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const jwtSecret =
  "0d6100220f41af02a8f8796995ec1d765425cabf37bd401665949fd04347b7a205818c";

module.exports = {
  register: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "Empty Email or Password" });
      }

      const user = await User.findOne({ email: email });

      if (user) {
        res.status(400).json({ message: "Email is already in use" });
      } else {
        next();
      }
    } catch (error) {
      return error;
    }
  },
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          message: "Username or Password not present",
        });
      } else {
        next();
      }
    } catch (error) {
      return error;
    }
  },
  updateRole: async (req, res, next) => {
    const { role, id } = req.body;

    if (role && id) {
      next();
    } else {
      res.status(400).json({ message: "Role or Id not present" });
    }
  },
  updateProfile: async (req, res, next) => {
    const { id } = req.body;

    if (id) {
      next();
    } else {
      res.status(400).json({ message: "Id not present" });
    }
  },
  deleteUser: async (req, res, next) => {
    const { id } = req.body;

    if (id) {
      next();
    } else {
      res.status(400).json({
        message: "ID is not present",
      });
    }
  },
  getUser: async (req, res, next) => {
    const { id } = req.params;
    if (id) {
      next();
    } else {
      res.status(400).json({
        message: "ID is not present",
      });
    }
  },
  adminAuth: (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          if (decodedToken.role !== "admin") {
            return res.status(401).json({ message: "Not authorized" });
          } else {
            next();
          }
        }
      });
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" });
    }
  },
  userAuth: (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          if (decodedToken.role !== "learner") {
            return res.status(401).json({ message: "Not authorized" });
          } else {
            next();
          }
        }
      });
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" });
    }
  },
};
