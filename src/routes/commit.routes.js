import { Router } from "express";
import { getCommits, fetchAndSaveCommits } from "../controllers/commit.controller.js";

const commitRouter = Router();

commitRouter.get('/commits', getCommits);
commitRouter.post('/commits/fetch', fetchAndSaveCommits);

export { commitRouter };