const { getUserByEmail, findOneUser } = require('../../api/user/user.service');
const { signToken } = require('../auth.service');

async function handlerLogin(request, response) {
  const { email, password } = request.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return response.status(401).json({ error: { message: 'Email o contraseña invalido' } });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return response.status(401).json({ error: { message: 'Email o contraseña invalido' } });
    }
    const token = signToken(user.profile);
    return response.status(200).json({ user: user.profile, token });
  } catch (error) {
    return response.status(400).json({ error });
  }
}

async function handlerVerifyAccount(request, response) {
  const { token } = request.params;
  try {
    const user = await findOneUser({ passwordResetToken: token });
    if (!user) {
      return response.status(400).json({ message: 'Invalid token' });
    }
    if (Date.now() > user.passwordResetExpires) {
      return response.status(400).json({ message: 'Token expired' });
    }
    user.isActive = true;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();
    const jwtToken = signToken(user.profile);
    return response.status(200).json({ message: 'Account verified', token: jwtToken });
  } catch (error) {
    return response.status(400).json(error);
  }
}

module.exports = { handlerLogin, handlerVerifyAccount };
