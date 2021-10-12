require("dotenv").config();
const admin = require("firebase-admin");
var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// const checkAuth = async (req, res, next) => {
//   try {
//     if (req.headers.authtoken) {
//       req.user = await admin.auth().verifyIdToken(req.headers.authtoken);
//       next();
//     } else {
//       res.status(403).send("Unauthorized");
//     }
//   } catch (err) {
//     next(err);
//   }
// };

//Use this version if testing with Postman and Bearer Token!
const checkAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      req.user = await admin.auth().verifyIdToken(req.headers.authorization.split(" ")[1]);
      next();
    } else {
      res.status(403).send("Unauthorized");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {checkAuth};
