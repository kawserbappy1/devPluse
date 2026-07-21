import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/create-user", userController.createUser);
router.get("/get-all-users", userController.getAllUser);
router.get("/get-single-user/:id", userController.getSingleUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUser);
export const userRouter = router;
