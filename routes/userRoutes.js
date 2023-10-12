const router = require("express").Router();
const userController = require("./../controllers/userControllers");
const userMiddlewares = require("./../middlewares/userMiddlewares");

router.get("/getUser/:id", userMiddlewares.getUser, userController.getUser);
router.get("/logout", userController.logout);
router.post("/register", userMiddlewares.register, userController.register);
router.post("/login", userMiddlewares.login, userController.login);
router.put(
  "/updateRole",
  userMiddlewares.updateRole,
  userController.updateRole
);
router.put(
  "/updateProfile",
  userMiddlewares.updateProfile,
  userController.updateProfile
);
router.delete(
  "/deleteUser",
  userMiddlewares.deleteUser,
  userController.deleteUser
);

module.exports = router;
