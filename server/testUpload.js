const router = require("express").Router();
module.exports = router;
const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const AWS = require("aws-sdk");
const { AWSAccessKeyId, AWSSecretKey } = require("../secrets");
const app = require("./app");
const S3 = new AWS.S3({
  signatureVersion: "v4",
  apiVersion: "2006-03-01",
  accessKeyId: AWSAccessKeyId,
  secretAccessKey: AWSSecretKey,
  region: "us-east-2",
});

router.post("/", (req, res, next) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    console.log(files.file)
    if (err) {
      next(err);
      return;
    }

    const id = uuidv4();
    S3.putObject({
      Bucket: "mole-tracks",
      Key: id,
      ContentType: files.file.type,
      ContentLength: files.file.size,
      Body: fs.createReadStream(files.file.path),
    }, ()=>res.redirect("/"));
  });
});
