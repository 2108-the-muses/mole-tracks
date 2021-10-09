// require("dotenv").config();
const router = require("express").Router();
// const admin = require("firebase-admin");
const {checkAuth} = require("../auth-middleware.js");
const {
  models: {User},
} = require("../db");
module.exports = router;

// var serviceAccount = require("/Users/alexandra/Documents/Grace-Hopper-Academy/Senior-Phase/Capstone/mole-tracks/mole-tracks-firebase-adminsdk.json");

// var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const checkAuth = async (req, res, next) => {
//   try {
//     if (req.headers.authtoken) {
//       req.user = await admin.auth().verifyIdToken(req.headers.authtoken);
//       console.log("RESPONSE************", req.user);
//       next();
//     } else {
//       res.status(403).send("Unauthorized");
//     }
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// };

// const checkAuth = async (req, res, next) => {
//   console.log("AUTH TOKEN", req.headers.authtoken);
//   if (req.headers.authtoken) {
//     admin
//       .auth()
//       .verifyIdToken(req.headers.authtoken)
//       .then(() => {
//         next();
//       })
//       .catch(() => {
//         res.status(403).send("Unauthorized");
//       });
//   } else {
//     res.status(403).send("Unauthorized");
//   }
// };

router.post("/login", async (req, res, next) => {
  try {
    res.send({token: await User.authenticate(req.body)});
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    console.log("POST--USER SIGNUP");
    const user = await User.create(req.body);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.get("/me", checkAuth, async (req, res, next) => {
  try {
    // const {uid} = firebaseAdmin.auth().verifyIdToken(req.headers.authorization);
    console.log("in ME*****************", req.user);
    //     iss: 'https://securetoken.google.com/mole-tracks',
    //   aud: 'mole-tracks',
    //   auth_time: 1633746096,
    //   user_id: 'z3knTCBBYkPxYgiOtq9vmLNpeDq2',
    //   sub: 'z3knTCBBYkPxYgiOtq9vmLNpeDq2',
    //   iat: 1633746097,
    //   exp: 1633749697,
    //   email: 'baby@ba.com',
    //   email_verified: false,
    //   firebase: { identities: { email: [Array] }, sign_in_provider: 'password' },
    //   uid: 'z3knTCBBYkPxYgiOtq9vmLNpeDq2'
    // }
    res.send(req.user.email);
  } catch (ex) {
    next(ex);
  }
});
