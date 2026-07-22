import { pool } from "../../db";
import AppError from "../../errors/AppError";
import type { Issue } from "./issues.interface";

const createIssueIntoDB = async (payload: Issue, reporterId: number) => {
  const { title, description, type, status } = payload;
  // Check for duplicate
  const existingIssue = await pool.query(
    `
    SELECT id
    FROM issues
    WHERE LOWER(title) = LOWER($1)
    `,
    [title],
  );

  if (existingIssue.rows.length > 0) {
    throw new AppError(409, "An issue with this title already exists.");
  }
  const result = await pool.query(
    `
  INSERT INTO issues
  (title, description, type, reporter_id, status)
  VALUES($1,$2,$3,$4,COALESCE($5,'open'))
  RETURNING *;
  `,
    [title, description, type, reporterId, status],
  );
  return result.rows[0];
};

const getAllIssuesFromDB = async (repoterId: number) => {
  console.log(repoterId);
  const result = await pool.query(
    `
    SELECT * FROM issues WHERE reporter_id = $1
    `,
    [repoterId],
  );
  return result.rows;
};
export const issueServices = {
  createIssueIntoDB,
  getAllIssuesFromDB,
};
