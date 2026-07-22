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
router.get(
  "/get-all-issue",
  auth(USER_ROLE.contributor, USER_ROLE.maintainer),
  issueController.getAllIssues,
);
router.get(
  "/:id",
  auth(USER_ROLE.contributor, USER_ROLE.maintainer),
  issueController.getSingleIssue,
);

export const issuesRouter = router;
