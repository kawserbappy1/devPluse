import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/create-user", userController.createUser);
router.get("/get-all-users", userController.getAllUser);
router.get("/get-single-user/:id", userController.getSingleUser);
export const userRouter = router;
