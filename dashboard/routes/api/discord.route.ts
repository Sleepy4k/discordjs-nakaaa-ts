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
import {
  userIndex,
  pingIndex,
  guildIndex,
  uptimeIndex,
  inviteIndex,
  githubIndex,
  channelIndex
} from "@dashboard/controllers/api/discord.controller";

/**
 * Initialize router.
 * @type {Router}
 */
const router: Router = Router();

/* GET guild page. */
router.get("/guilds", guildIndex);

/* GET user page. */
router.get("/users", userIndex);

/* GET channel page. */
router.get("/channels", channelIndex);

/* GET ping page. */
router.get("/ping", pingIndex);

/* GET uptime page. */
router.get("/uptime", uptimeIndex);

/* GET invite page. */
router.get("/invite", inviteIndex);

/* GET github page. */
router.get("/github", githubIndex);

export default router;
