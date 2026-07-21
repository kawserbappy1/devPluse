import type { Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/senderResponse";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loginUserFromDB(req.body);

  const { accessToken, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Login Successfull",
    data: {
      accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.generateRefreshToken(
    req.cookies.refreshToken,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "access token generated",
    data: result,
  });
});

const loguout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    secure: false, // change to true in production with HTTPS
    httpOnly: true,
    sameSite: "lax",
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged out successfully",
    data: null,
  });
});

export const authController = {
  loginUser,
  refreshToken,
  loguout,
};
