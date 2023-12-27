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
import { print } from "@utils";
import { EPrintType } from "@enums";

/**
 * Event listener for HTTP server "error" event.
 *
 * @param {NodeJS.ErrnoException} error
 * @param {number | string | boolean} port
 *
 * @returns {void}
 */
function onError(error: NodeJS.ErrnoException, port: number | string | boolean): void {
  if (error.syscall !== "listen") throw error;

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      print(bind + " requires elevated privileges", EPrintType.ERROR);
      process.exit(1);
    case "EADDRINUSE":
      print(bind + " is already in use", EPrintType.ERROR);
      process.exit(1);
    default:
      throw error;
  }
}

export default onError;
