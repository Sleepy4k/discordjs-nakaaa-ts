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
import http from "http";
import debugLib from "debug";
import { print } from "@utils";
import { Bot } from "@core/bot";
import { EPrintType } from "@enums";
import app from "@dashboard/express";
import slugify from "@dashboard/utils/slugify";
import onError from "@dashboard/events/onError.handler";
import normalizePort from "@dashboard/utils/normalizePort";
import onListening from "@dashboard/events/onListening.handler";

/**
 * Create server
 *
 * @param {Bot} client
 *
 * @returns {void}
 */
const createServer = (client: Bot): void => {
  /**
   * Setup debug
   */
  const name = slugify(client.config.bot.name);
  const debug = debugLib(`${name}:server`);

  /**
   * Set client to express app
   */
  app.set("client", client);

  /**
   * Get hostname from environment and store in Express.
   */
  const hostname = client.config.web.hostname || "localhost";
  app.set("hostname", hostname);

  /**
   * Get port from environment and store in Express.
   */
  const port = normalizePort(client.config.web.port || "3000");
  app.set("port", port);

  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port, () => print(`Dashboard is running on ${hostname}:${port}`, EPrintType.WEB));
  server.on("error", (err: NodeJS.ErrnoException) => onError(err, port));
  server.on("listening", () => onListening(server, debug));
}

export default createServer;
