import type { Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/senderResponse";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loginUserFromDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Login Successfull",
    data: result,
  });
});

export const authController = {
  loginUser,
};
