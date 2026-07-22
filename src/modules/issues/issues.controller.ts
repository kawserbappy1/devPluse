import type { Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/senderResponse";
import { issueServices } from "./issues.services";
import AppError from "../../errors/AppError";

const createIssue = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError(401, "Unauthorized");
  }
  const reporterId = req.user.id;
  const result = await issueServices.createIssueIntoDB(req.body, reporterId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Create issue successfully",
    data: result,
  });
});

export const issueController = { createIssue };
