import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth.middleware";
import { USER_ROLE } from "../../type";

const router = Router();

router.post("/create-user", userController.createUser);
router.get(
  "/get-all-users",
  auth(USER_ROLE.maintainer),
  userController.getAllUser,
);
router.get(
  "/get-single-user/:id",
  auth(USER_ROLE.maintainer, USER_ROLE.contributor),
  userController.getSingleUser,
);
router.put(
  "/update-user/:id",
  auth(USER_ROLE.maintainer, USER_ROLE.contributor),
  userController.updateUser,
);
router.delete(
  "/delete-user/:id",
  auth(USER_ROLE.maintainer),
  userController.deleteUser,
);
export const userRouter = router;
