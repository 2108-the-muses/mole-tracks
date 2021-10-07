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
    if (err) {
      next(err);
      return;
    }
  });
});
