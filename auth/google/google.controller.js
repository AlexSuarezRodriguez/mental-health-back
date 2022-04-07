const UserModel = require('../../api/user/user.model')
const { signToken } = require('../auth.service');
const { googleValidateToken } = require('../auth.google.service');

async function handlerGoogleSignIn(request, response) {
  const {googleToken} = request.body;

  try {
    const {name, email, picture } = await googleValidateToken(googleToken);
    // verificar que el usuario no se haya logueado anteriormente,
    // con ese mismo email. 
    const newUser = await UserModel.findOne({email});
    let user;

    if (!newUser) {
      // Si no existe el usuario, lo creamos
      user =  new UserModel({
        firstName: 'google',
        lastName: name,
        email,
        password: 'google',
        avatar: picture,
        google: true,
      });
    } else { 
      // Si existe el usuario
      user = newUser;
      user.google = true;
      // user.password = 'google';
    }

    // Guardamos el usuario
    await user.save();

    // Creamos el token - JWT
    const token = signToken(user.profile);

    response.status(200).json(token);
  }catch (error){
    response.status(401).json({message: 'Invalid googleToken'});
  }
}

module.exports = {handlerGoogleSignIn};
