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
import type { ErrorRequestHandler } from "express";

/**
 * Error handler
 *
 * @type {ErrorRequestHandler}
 */
const errorHandler: ErrorRequestHandler = (err, req, res) => {
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
   * Send error as JSON if request is from API
   * Return error page if request is from web
   */
  if (req.originalUrl.split("/")[1] === "api") res.send({
    status: "error",
    message: "Something went wrong! Please try again later.",
    data: {
      message: res.locals.message,
      error: res.locals.error
    }
  });
  else res.render("pages/error", function(err: any, html: any) {
    if (err) res.send({
      status: "error",
      message: "An error occurred! Missing view directory?",
      data: {
        message: res.locals.message,
        error: res.locals.error
      }
    });
    else res.send(html);
  });
}

export default errorHandler;
