async function handlerGoogleSignIn(request, response) {
  const {googleId, googleToken} = request.body;
  // try {
  //   const user = await getUserByGoogleId(googleId);
  //   if (!user){
  //     return response.status(401).json({message: 'Invalid googleId'});
  //   }
  //   const token = signToken(user.profile);
  //   response.status(200).json(token);
  // }catch (error){
  //   return response.status(400).json(error);
  // }
  return response.status(200).json(googleToken);
}

module.exports = {handlerGoogleSignIn};
