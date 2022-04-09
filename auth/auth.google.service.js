const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleValidateToken(googleToken) { 
  const ticket = await client.verifyIdToken({
    idToken: googleToken,
    audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];

  const { googleId, email, name, picture } = payload;

  return { googleId, email, name, picture};
}

module.exports = { 
  googleValidateToken,
};
