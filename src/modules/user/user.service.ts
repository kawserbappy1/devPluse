import bcrypt from "bcryptjs";
import type { IUser } from "./user.interface";
import { pool } from "../../db";
import AppError from "../../errors/AppError";

// create user service
const createUserToDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const existingUser = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [payload.email],
  );

  if (existingUser.rows.length > 0) {
    throw new AppError(409, "Email already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
        INSERT INTO users(name,email,password, role)VALUES($1,$2,$3,COALESCE($4,'contributor')) RETURNING *
        `,
    [name, email, hashPassword, role],
  );
  const { password: _, ...user } = result.rows[0];
  return user;
};

// get all user service
const getAllUserFromDB = async () => {
  const result = await pool.query(`
        
        SELECT name,email, role, created_at, updated_at FROM users
        
        `);
  return result;
};

// get single user controller
const getSingleUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
        SELECT * FROM users WHERE id=$1
        `,
    [id],
  );
  if (result.rows.length === 0) {
    throw new AppError(404, "User not found");
  }
  delete result.rows[0].password;
  return result.rows[0];
};

export const userService = {
  createUserToDB,
  getAllUserFromDB,
  getSingleUserFromDB,
};
