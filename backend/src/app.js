require("dotenv").config();
const express = require("express");
const connectToDb = require("./db/db");
const authRoutes = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")

const app = express();


app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello from server")
})

app.use("/api/auth", authRoutes);

module.exports = app;