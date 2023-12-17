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
  logIndex,
  logFindByType,
  logFindByDate
} from "@dashboard/controllers/api/log.controller";

/**
 * Initialize router.
 * @type {Router}
 */
const router: Router = Router();

/* GET log page. */
router.get("/", logIndex);

/* GET log type page. */
router.get("/:type", logFindByType);

/* GET log date page. */
router.get("/:type/:date", logFindByDate);

export default router;
