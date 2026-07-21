import bcrypt from "bcryptjs";
import type { IUser } from "./user.interface";
import { pool } from "../../db";
import AppError from "../../errors/AppError";

// create user service
const createUserToDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  // 1. check existing user
  const existingUser = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [payload.email],
  );

  if (existingUser.rows.length > 0) {
    throw new AppError(409, "Email already exists");
  }
  // 2. hashed password
  const hashPassword = await bcrypt.hash(password, 10);

  //  3. store information to database
  const result = await pool.query(
    `
        INSERT INTO users(name,email,password,role)VALUES($1,$2,$3,COALESCE($4,'contributor')) RETURNING *
        `,
    [name, email, hashPassword, role],
  );

  // 4. remove password from the returning values
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
  const { password: _, ...user } = result.rows[0];
  return user;
};

// update user information to database

const updateUserInfo = async (id: string, payload: Partial<IUser>) => {
  const { name, password, role } = payload;

  // 1.check user is exist
  const existingUser = await pool.query(
    `
      SELECT id FROM users WHERE id = $1
    `,
    [id],
  );
  if (existingUser.rows.length === 0) {
    throw new AppError(404, "User not Found");
  }
  // 2.Hash password only if provided
  let hashPassword;
  if (password) {
    hashPassword = await bcrypt.hash(password, 10);
  }

  // 3. insert updated info to database

  const result = await pool.query(
    `
    UPDATE users 
    SET
    name=COALESCE($1,name),
    password=COALESCE($2,password),
    role=COALESCE($3,role)

    WHERE Id=$4 RETURNING*
    
    `,
    [name, hashPassword, role, id],
  );

  const { password: _, ...user } = result.rows[0];
  return user;
};
const deleteUserFromDatabase = async (id: string) => {
  // 1.check user is exist
  const existingUser = await pool.query(
    `
      SELECT id FROM users WHERE id = $1
    `,
    [id],
  );
  if (existingUser.rows.length === 0) {
    throw new AppError(404, "User not Found");
  }

  const result = await pool.query(
    `
    DELETE FROM users WHERE id=$1
    `,
    [id],
  );
  return result;
};
export const userService = {
  createUserToDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserInfo,
  deleteUserFromDatabase,
};
