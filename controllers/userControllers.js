const userServices = require("./../services/userServices");

const register = async (req, res) => {
  try {
    await userServices.register(req, res);
  } catch (err) {
    console.log(err);
  }
};
const getUser = async (req, res) => {
  try {
    await userServices.getUser(req, res);
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    await userServices.login(req, res);
  } catch (error) {
    console.log(err);
  }
};

const logout = async (req, res) => {
    try {
      await userServices.logout(req, res);
    } catch (error) {
      console.log(err);
    }
  };

const updateRole = async (req, res) => {
    try {
        await userServices.updateRole(req, res)
    } catch (error) {
        console.log(err)
    }
}

const updateProfile = async (req, res) => {
  try {
      await userServices.updateProfile(req, res)
  } catch (error) {
      console.log(err)
  }
}

const deleteUser = async (req, res) => {
    try {
        await userServices.deleteUser(req, res)
    } catch (error) {
        console.log(err)
    }
}

module.exports = {
  register,
  getUser,
  login,
  logout,
  updateRole,
  updateProfile,
  deleteUser,
};
