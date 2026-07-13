import bcrypt from "bcryptjs";
import type { IUser } from "./user.interface";
import { pool } from "../../db";
// create user service
const createUserToDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
        INSERT INTO users(name,email,password, role)VALUES($1,$2,$3,$4) RETURNING *
        `,
    [name, email, hashPassword, role],
  );
  delete result.rows[0].password;
  return result;
};
const getAllUserFromDB = async () => {
  const result = await pool.query(`
        
        SELECT name,email, role, created_at, updated_at FROM users
        
        `);
  return result;
};
// get all user service
export const userService = {
  createUserToDB,
  getAllUserFromDB,
};
