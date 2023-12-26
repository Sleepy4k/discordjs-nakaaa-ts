/**
 * Coding service by Sleepy4k <sarahpalastring@gmail.com>
 *
 * Reselling this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Written by:
 * Apri Pandu Wicaksono
 *
 * Link: https://github.com/sleepy4k
 *
 * March 12, 2023
 */
// import logger from "morgan";
import { join } from "path";
import ejsMate from "ejs-mate";
import express, { Express } from "express";
import cookieSession from "cookie-session";
import logHandler from "./handlers/log.handler";
import localHandler from "./handlers/local.handler";
import notFound from "@dashboard/handlers/missing.handler";
import errorHandler from "@dashboard/handlers/error.handler";

/**
 * Import routes
 */
import routes from "@dashboard/routes/_index";

/**
 * Create express app
 * @type {Express}
 */
const app: Express = express();

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
// app.use(logger("dev"));
app.use(logHandler);
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
app.use(localHandler);

/**
 * Routes initialization
 */
app.use("/", routes);

/**
 * Catch 404 and forward to error handler
 */
app.use(notFound);

/**
 * Set error handler
 */
app.use(errorHandler);

export default app;
