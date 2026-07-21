import bcrypt from "bcryptjs";
import { pool } from "../../db";
import AppError from "../../errors/AppError";
import type { AIuser } from "./auth.interface";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config";

const loginUserFromDB = async (payload: AIuser) => {
  const { email, password } = payload;

  //   1.check user exists
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    
    `,
    [email],
  );
  if (userData.rows.length === 0) {
    throw new AppError(401, "Invalid email or password");
  }
  //   2.find user
  const user = userData.rows[0];

  //   2. compare password
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new AppError(401, "Invalid email or password");
  }

  // 4.  generate jwt payload
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.accessToken as string, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(jwtPayload, config.refrehToken as string, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const generateRefreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(401, "Unauthorized");
  }

  const decoded = jwt.verify(
    token as string,
    config.refrehToken as string,
  ) as JwtPayload;
  const userData = await pool.query(
    `
      SELECT * FROM users WHERE email=$1
    `,
    [decoded.email],
  );
  const { password: _, ...user } = userData.rows[0];
  if (userData.rows.length === 0) {
    throw new AppError(404, "User not found");
  }
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.accessToken as string, {
    expiresIn: "1d",
  });
  return { accessToken };
};

export const authServices = {
  loginUserFromDB,
  generateRefreshToken,
};
