const express = require("express");
const mongooose = require("mongoose");
const cors = require("cors");
const api = require("./api");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => res.send("Initial Route"));

app.use("/api", api);

mongooose
  .connect(
    `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@my-project.96wsl.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(PORT, () => console.log(`Server running at port: ${PORT}`))
  )
  .catch((err) => console.log(err));
