import type { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import catchAsync from "../utility/catchAsync";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import type { ROLES } from "../type";

const auth = (...roles: ROLES[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // console.log("roles ==>", roles);
    // console.log("this is request header --->", req.headers.authorization);
    // 1. if token exists
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, "Authentication token is required");
    }
    // 2. verifying token
    const decodedInfo = jwt.verify(
      token as string,
      config.accessToken as string,
    ) as JwtPayload;
    // console.log(decodedInfo);

    const userData = await pool.query(
      `
        SELECT id, email, role FROM users WHERE id=$1
        `,
      [decodedInfo.id],
    );
    // 3. find authorized user
    const user = userData.rows[0];
    // console.log(userData);

    // 4. check user is exists
    if (!user) {
      throw new AppError(401, "User not found");
    }
    // console.log("Auth role ==>, ", user.role);

    // 5. check user role
    if (roles.length && !roles.includes(user.role)) {
      throw new AppError(403, "You are not authorized to access this resource");
    }
    //6. set user
    req.user = user;

    next();
  });
};

export default auth;
