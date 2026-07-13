import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/create-user", userController.createUser);
router.get("/get-all-users", userController.getAllUser);
export const userRouter = router;
