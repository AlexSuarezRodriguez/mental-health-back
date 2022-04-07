const { googleValidateToken } = require('../auth.google.service');

async function handlerGoogleSignIn(request, response) {
  const {googleToken} = request.body;

  try {

    const {name, email, picture } = await googleValidateToken(googleToken);

    response.status(200).json({
      googleToken, 
      name, 
      email, 
      picture
    });
  }catch (error){
    response.status(401).json({message: 'Invalid googleToken'});
  }
}

module.exports = {handlerGoogleSignIn};
