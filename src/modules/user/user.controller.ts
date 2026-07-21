import type { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utility/senderResponse";
import catchAsync from "../../utility/catchAsync";

// create user controller
// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await userService.createUserToDB(req.body);
//     sendResponse(res, {
//       statusCode: 201,
//       success: true,
//       message: "User created successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     next(error);
//   }
// };
const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUserToDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

// get all user controller
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUserFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data: result.rows,
  });
});

// get single user controller

// const getSingleUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const { id } = req.params;
//     const result = await userService.getSingleUserFromDB(id as string);
//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "Single user retrive successfully",
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.getSingleUserFromDB(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single user retrive successfully",
    data: result,
  });
});

// update user to database
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.updateUserInfo(id as string, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});
export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
};
