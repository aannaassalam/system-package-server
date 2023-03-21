const express = require("express");
const router = express.Router();
const otpGenerator = require("otp-generator");
const settings = require("../Models/settings");

var otp = "";

router.get("/login", (req, res) => {
  otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false,
  });
  res.json({ otp });
});

router.post("/verifyLogin", (req, res) => {
  if (req.body.otp === otp) res.json({ status: 200, msg: "Successfull" });
  else res.json({ status: 401, msg: "Incorrect OTP" });
});

router.post("/settings", (req, res) => {
  const { logo, heading } = req.body;

  if (!heading.length)
    res.status(400).json({ msg: "Heading cannot be empty!" });

  if (!logo.length) res.status(400).json({ msg: "Please select a logo!" });

  settings
    .findOneAndUpdate(
      { _id: "64170b7ec93c15038228526d" },
      { logo: logo, heading }
    )
    .then(() => res.json({ msg: "Settings updated successfully" }))
    .catch((err) => {
      res.status(500).json({ msg: "Internal server error", err });
      console.log(err);
    });
});

router.get("/settings", (req, res) => {
  settings
    .findOne()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
});

module.exports = router;
