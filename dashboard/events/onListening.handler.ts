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

/**
 * Event listener for HTTP server "listening" event.
 * 
 * @param {any} server
 * @param {any} debug
 *
 * @returns {void}
 */
function onListening(server: any, debug: any): void {
  const addr = server.address();

  if (!addr) return;
  else if (typeof addr === "string") {
    debug("Listening on " + addr);
    return;
  }

  debug("Listening on port " + addr.port);
}

export default onListening;
