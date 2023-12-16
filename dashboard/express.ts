/**
 * Module dependencies.
 */
import logger from "morgan";
import { join } from "path";
import express from "express";
import ejsMate from "ejs-mate";
import { version } from "discord.js";
import type { ErrorRequestHandler } from "express";
import createError from "http-errors";
import cookieSession from "cookie-session";

/**
 * Import routes
 */
import routes from "@dashboard/routes/_index";

/**
 * Create express app
 */
const app = express();

/**
 * View engine setup
 */
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use('/public', express.static(join(__dirname, "public")));

/**
 * Setup logger and middlewares
 */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  name: "session",
  secret: "secret",
  httpOnly: true
}));

/**
 * Set locals
 */
app.use(function (req, res, next) {
  res.locals.data = {};
  res.locals.discord = version;
  res.locals.node = process.version;
  res.locals.title = req.app.get("client").config.web.name;
  res.locals.author = req.app.get("client").config.bot.author;
  res.locals.baseUrl = `${req.protocol}://${req.hostname}:${req.app.get("port")}`;
  next();
});

/**
 * Routes initialization
 */
app.use("/", routes);

/**
 * Catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
  next(createError(404));
});

/**
 * Error handler
 */
const errorHandler: ErrorRequestHandler = function (err, req, res, next) {
  /**
   * Set locals, only providing error in development
   */
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  /**
   * Set response status
   */
  res.status(err.status || 500);

  /**
   * Send error as JSON
   */
  if (req.originalUrl.split("/")[1] === "api") return res.send({
    status: "error",
    message: "Something went wrong! Please try again later.",
    data: {
      message: res.locals.message,
      error: res.locals.error
    }
  });

  /**
   * Render the error page
   */
  res.render("pages/error", function(err: any, html: any) {
    if (err) return res.send({
      status: "error",
      message: "An error occurred! Missing view directory?",
      data: {
        message: res.locals.message,
        error: res.locals.error
      }
    });

    res.send(html);
  });
}

/**
 * Set error handler
 */
app.use(errorHandler);

export default app;
