const {
  getAllUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
  getUserByEmail,
} = require('./user.service');

async function handlerGetAllUsers(request, response){
  const users = await getAllUsers();
  response.status(200).json(users);
}

async function handlerGetUserById(request, response){
  const { id } = request.params;
  try {
    const user = await getUserById(id);
    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({message:'error'});
  }
}

async function handlerCreateUser(request, response) {
  const newUser = request.body;
  try {
    const user = await createUser(newUser);
    response.status(201).json(user);
  } catch (error) {
    response.status(404).json({message:"error"});
  } 
}

async function handlerUpdateUser(request, response) {
  const { id } = request.params;
  const body = request.body;
  try{
    const updatedUser = await updateUser(id, body);
    response.status(201).json(updatedUser);
  } catch (error) {
    response.status(500).json({message:"error"});
  }
}

async function handlerDeleteUser(request, response) {
  const { id } = request.params;
  const {email}=request.body;

  if(!id){
    try {
      const {_id} = await getUserByEmail(email);
      const deletedUser = await deleteUser(_id);
      response.status(200).json(deletedUser);
    } catch (error) {
      response.status(400).json({message:"error"});
    }
  }
  else{
    try {
      const deletedUser = await deleteUser(id);
      response.status(200).json(deletedUser);
    } catch (error) {
      response.status(408).json({message:"error"});
    }

  }
}

module.exports = {
  handlerGetAllUsers,
  handlerGetUserById,
  handlerCreateUser,
  handlerUpdateUser,
  handlerDeleteUser,
}