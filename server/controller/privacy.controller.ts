import { Request, Response } from "express";
import {
  checkThirdPartyResources,
  extractAndScanElements,
} from "../utils/utils";

export const scrapWebsite = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    const response = await extractAndScanElements(url);
    res.status(200).json({ data: response });
    return;
  } catch (error) {
    res.status(500).json({ error: "Internal server error " });
    return;
  }
};

export const getTrackers = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    const response = await checkThirdPartyResources(url);
    res.status(200).json({ data: response });
    return;
  } catch (error) {
    res.status(500).json({ error: "Internal server error " });
    return;
  }
};
