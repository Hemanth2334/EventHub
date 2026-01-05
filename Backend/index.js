require('dotenv').config();

const express = require("express");
const cors = require("cors"); 
const app = express();
const port = 5000;
const mongoDB = require("./db");

mongoDB();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use('/api/manage', require('./Routes/ManageOrganisations.js'));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});