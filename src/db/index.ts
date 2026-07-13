import { Pool } from "pg";
import config from "../config";

const pool = new Pool({
  connectionString: config.dbConnection,
});

export const initialDB = async () => {
  try {
    await pool.query(`
                CREATE TABLE IF NOT EXISTS users(
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    role TEXT DEFAULT 'contributor',
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                
                )
            `);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS issues(
            id SERIAL PRIMARY KEY,
            title VARCHAR(150) NOT NULL,
            description TEXT NOT NULL CHECK (char_length(description) >=20),
            type TEXT NOT NULL CHECK (type IN('bug', 'feature_request')),
            status TEXT NOT NULL DEFAULT 'open' CHECK (status IN('open', 'in_progress', 'resolved')),
            reporter_id INT REFERENCES users(id) NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
        
        `);

    console.log("Database Connection successfully");
  } catch (error) {
    console.log(error);
  }
};
