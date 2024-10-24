var createError = require("http-errors");
var express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // or 'pug', 'hbs', etc., depending on your preferred template engine

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.ORIGIN
        : "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"], // 추가
    allowedHeaders: ["Content-Type", "Authorization"], // 추가
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "lax",
      httpOnly: true,
    },
    store: new FileStore({
      path: "./sessions",
    }),
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routing
app.use("/", require("./routes"));

app.all("*", (req, res) => res.status(404).json('route not defined'))

module.exports = app;
