/**
 * Module dependencies.
 */
import api from "./api";
import web from "./web";
import { Router } from "express";

/*
 * Initialize router.
 */
const router = Router();

/* Web Route. */
router.use("/", web);

/* Api Route. */
router.use("/api/", api);

export default router;
