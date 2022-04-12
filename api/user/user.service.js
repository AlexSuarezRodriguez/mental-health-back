const UserModel = require('./user.model');

async function getAllUsers() {
  const users = await UserModel.find();
  return users;
}

async function getUserById(id) {
  const user = await UserModel.findById(id);
  return user;
}

async function getUserByEmail(email) {
  const user = await UserModel.findOne({ email });
  return user;
}

async function deleteUser(id) {
  const user = await UserModel.findByIdAndDelete(id);
  return user;
}

async function createUser(user) {
  const newUser = await UserModel.create(user);
  return newUser;
}

async function updateUser(id, user) {
  const updatedUser = await UserModel.findByIdAndUpdate(id, user, { new: true });
  return updatedUser;
}

async function findOneUser(query) {
  const user = await UserModel.findOne(query);
  return user;
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUser,
  createUser,
  updateUser,
  findOneUser,
};
