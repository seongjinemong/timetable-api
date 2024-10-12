var createError = require("http-errors");
var express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

require('dotenv').config();

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // or 'pug', 'hbs', etc., depending on your preferred template engine

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"], // 추가
    allowedHeaders: ["Content-Type", "Authorization"], // 추가
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      httpOnly: true, // 추가
    },
    store: new FileStore({
      path: "./sessions", // 추가
    }),
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routing
app.use("/", require("./routes"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
