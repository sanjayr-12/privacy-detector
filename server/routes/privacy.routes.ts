import express from "express";
import { getTrackers, scrapWebsite } from "../controller/privacy.controller";

const router = express.Router();

router.post("/scrap", scrapWebsite);
router.post("/tracker", getTrackers);

export default router;
