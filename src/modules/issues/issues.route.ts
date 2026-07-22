import { Router } from "express";
import { issueController } from "./issues.controller";
import auth from "../../middleware/auth.middleware";
import { USER_ROLE } from "../../type";

const router = Router();

router.post(
  "/create-issue",
  auth(USER_ROLE.contributor, USER_ROLE.maintainer),
  issueController.createIssue,
);

export const issuesRouter = router;
