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
import { Router } from "express";
import discordRoute from "./discord.route";

/**
 * Initialize router.
 * @type {Router}
 */
const router: Router = Router();

/* GET home page. */
router.get("/", function (_req, res) {
  res.status(200);
  res.render("pages/index");
});

/* GET base discord route. */
router.use("/", discordRoute);

export default router;
