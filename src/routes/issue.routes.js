import { Router } from "express";
import { getAllIssues, getIssueByIssueId, fetchAndSyncAllIssues } from "../controllers/issue.controller.js";

const issueRouter = Router();

issueRouter.get('/issues', getAllIssues);
issueRouter.get('/issues/:issueId', getIssueByIssueId);
issueRouter.post('/issues/fetch', fetchAndSyncAllIssues);

export { issueRouter };