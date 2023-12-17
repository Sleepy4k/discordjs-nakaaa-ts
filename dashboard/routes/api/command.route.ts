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
import { commandIndex, commandShow } from "@dashboard/controllers/api/command.controller";

/**
 * Initialize router.
 * @type {Router}
 */
const router: Router = Router();

/* GET commands page. */
router.get("/", commandIndex);

/* GET command page. */
router.get("/:command", commandShow);

export default router;
