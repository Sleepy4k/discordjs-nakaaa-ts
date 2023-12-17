/**
 * Module dependencies.
 */
import { Router } from "express";
import apiRoute from "./api/_index";
import webRoute from "./web/_index";

/**
 * Initialize router.
 * @type {Router}
 */
const router: Router = Router();

/* Web Route. */
router.use("/", webRoute);

/* Api Route. */
router.use("/api/", apiRoute);

export default router;
