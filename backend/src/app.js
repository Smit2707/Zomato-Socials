require("dotenv").config();
const express = require("express");
const connectToDb = require("./db/db");
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const cookieParser = require("cookie-parser")
const cors = require('cors')

const app = express();


app.use(cors({
    origin:"http://localhost:5173",
    credentials: true 
}))
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello from server")
})

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

module.exports = app;