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
import { Request, Response } from "express";

/**
 * Route not found handler
 */
const notFound = (req: Request, res: Response) => {
  /**
   * Set locals, only providing error in development
   */
  res.locals.message = "Route Not Found";
  res.locals.error = req.originalUrl;

  /**
   * Set response status
   */
  res.status(404);

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
  else res.render("pages/missing", function(err: any, html: any) {
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

export default notFound;
