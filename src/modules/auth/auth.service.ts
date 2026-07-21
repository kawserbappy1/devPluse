import bcrypt from "bcryptjs";
import { pool } from "../../db";
import AppError from "../../errors/AppError";
import type { AIuser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUserFromDB = async (playload: AIuser) => {
  const { email, password } = playload;

  //   1.check user exists
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    
    `,
    [playload.email],
  );
  if (userData.rows.length === 0) {
    throw new AppError(404, "User not exists");
  }
  //   2.find user
  const user = userData.rows[0];

  //   2. compare password
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new AppError(401, "Invalid Credentials");
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

  return { accessToken };
};

export const authServices = {
  loginUserFromDB,
};
