const express = require("express");
const mongooose = require("mongoose");
const cors = require("cors");
const otpGenerator = require("otp-generator");
const settings = require("./Models/settings");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var otp = "";

app.get("/api/login", (req, res) => {
  otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false,
  });
  res.json({ otp });
});

app.post("/api/verifyLogin", (req, res) => {
  if (req.body.otp === otp) res.json({ status: 200, msg: "Successfull" });
  else res.json({ status: 401, msg: "Incorrect OTP" });
});

app.post("/api/settings", (req, res) => {
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

app.get("/api/settings", (req, res) => {
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

mongooose
  .connect(
    `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@my-project.96wsl.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(PORT, () => console.log(`Server running at port: ${PORT}`))
  )
  .catch((err) => console.log(err));
