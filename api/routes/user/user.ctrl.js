const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

const login = async (req, res) => {
  const { credential, client_id } = req.body;

  // Save credential and client_id to session
  req.session.credential = credential;

  // console.log(req.session.credential);

  req.session.save(async () => {
    console.log("Session Data Saved!");

    try {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: client_id,
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      res.status(200).json({ payload });
    } catch (err) {
      res.status(400).json({ err });
    }
  });
};

const checkSessionData = async (req, res) => {
  // console.log(req.session);

  // Assuming session data is stored in req.session
  res.status(200).json({ sessionData: req.session.credential });
};

module.exports = {
  login,
  checkSessionData, // Added the checkSessionData function to the exports
};
