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
import { docIndex, discordIndex } from "@dashboard/controllers/web/discord.controller";

/**
 * Initialize router.
 * @type {Router}
 */
const router: Router = Router();

/* GET docs page. */
router.get("/docs", docIndex);

/* GET discord page. */
router.get("/discord", discordIndex);

export default router;
