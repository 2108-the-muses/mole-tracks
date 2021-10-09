require("dotenv").config();
const admin = require("firebase-admin");
var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const checkAuth = async (req, res, next) => {
  try {
    if (req.headers.authtoken) {
      req.user = await admin.auth().verifyIdToken(req.headers.authtoken);
      console.log("RESPONSE************", req.user);
      next();
    } else {
      res.status(403).send("Unauthorized");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {checkAuth};
