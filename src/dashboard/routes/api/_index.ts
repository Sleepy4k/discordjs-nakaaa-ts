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
import logRoute from "./log.route";
import slashRoute from "./slash.route";
import commandRoute from "./command.route";
import discordRoute from "./discord.route";
import { welcomeIndex } from "@dashboard/controllers/api/welcome.controller";

/**
 * Initialize router.
 * @type {Router}
 */
const router: Router = Router();

/* GET base route. */
router.get("/", welcomeIndex);

/* GET slash route. */
router.use("/slash", slashRoute);

/* GET command route. */
router.use("/command", commandRoute);

/* GET base discord route. */
router.use("/", discordRoute);

/* GET log route. */
router.use("/log", logRoute);

export default router;
