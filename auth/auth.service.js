const jwt = require('jsonwebtoken');
const compose = require('composable-middleware');

const getSecrets = () => process.env.SECRET_WORD;

const { getUserByEmail } = require('../api/user/user.service');

async function validateToken(token) {
  try {
    const payload = await jwt.verify(token, getSecrets());
    return payload;
  } catch (error) {
    return null;
  }
}

function isAuthenticated() {
  return compose().use(
    async (request, response, next) => {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        return response.status(401).end();
      }
      const [, token] = authHeader.split(' ');
      const payload = await validateToken(token);
      if (!payload) {
        return response.status(401).end();
      }
      const user = await getUserByEmail(payload.email);
      if (!user) {
        return response.status(401).end();
      }
      request.user = user;
      next();
      return null;
    },
  );
}

function hasRole(allowRoles = []) {
  return compose()
    .use(isAuthenticated())
    .use((request, response, next) => {
      const { role } = request.user;
      if (!allowRoles.includes(role)) {
        return response.status(403).send('Forbidden');
      }
      next();
      return null;
    });
}

function signToken(payload) {
  const token = jwt.sign(payload, getSecrets(), { expiresIn: '2h' });
  return token;
}

module.exports = {
  isAuthenticated,
  hasRole,
  signToken,
};
