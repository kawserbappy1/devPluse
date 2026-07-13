import type { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utility/senderResponse";

// create user controller
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserToDB(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};
// get all user controller
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserFromDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User retrive successfully",
      data: result.rows,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};
export const userController = {
  createUser,
  getAllUser,
};
