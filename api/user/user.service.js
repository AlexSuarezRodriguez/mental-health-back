const UserModel = require ('./user.model')

async function getAllUsers() {
  const users = await UserModel.find();
  return users;
}

async function getOneUser(id) {
  const user = await UserModel.findById(id);
  if (!user){
    return null;
  } else {
    return user;
  }
}

async function deleteUser(id) {
  const user = await UserModel.findByIdAndDelete(id);
  if (!user){
    return null;
  } else {
    return user;
  }
}

async function createUser(user) {
  const newUser = await UserModel.create(user);
  return newUser;
}

async function updateUser(id, user) {
  const updatedUser = await UserModel.findByIdAndUpdate(id, user);
  return updatedUser;
}

module.exports = {
  getAllUsers,
  getOneUser,
  deleteUser,
  createUser,
  updateUser,
}