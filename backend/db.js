require("dotenv").config();
const { Pool } = require("pg");
const retry = require("async-retry");

const pool = new Pool({
  user: process.env.DB_USER,
  host: "db",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

const initDb = async () => {
  await retry(
    async () => {
      await pool.query(`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        author_first_name VARCHAR(100) NOT NULL,
        author_last_name VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

      await pool.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS unique_book_index
      ON books (
        LOWER(author_first_name),
        LOWER(author_last_name),
        LOWER(title)
      );
    `);
    },
    { retries: 5 }
  );
};

const getAllBooks = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM books ORDER BY created_at DESC"
  );
  return rows;
};

const getBookById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
  return rows[0];
};

const bookExists = async (authorFirstName, authorLastName, title) => {
  const { rows } = await pool.query(
    `
      SELECT * FROM books
      WHERE LOWER(author_first_name) = LOWER($1)
        AND LOWER(author_last_name) = LOWER($2)
        AND LOWER(title) = LOWER($3)
    `,
    [authorFirstName, authorLastName, title]
  );
  return rows.length > 0;
};

const addBook = async (authorFirstName, authorLastName, title) => {
  await pool.query(
    `
      INSERT INTO books (author_first_name, author_last_name, title)
      VALUES ($1, $2, $3)
    `,
    [authorFirstName, authorLastName, title]
  );
};

const updateBook = async (id, authorFirstName, authorLastName, title) => {
  await pool.query(
    `
      UPDATE books
      SET author_first_name = $1,
          author_last_name = $2,
          title = $3
      WHERE id = $4
    `,
    [authorFirstName, authorLastName, title, id]
  );
};

const deleteBook = async (id) => {
  await pool.query("DELETE FROM books WHERE id = $1", [id]);
};

module.exports = {
  pool,
  initDb,
  getAllBooks,
  getBookById,
  bookExists,
  addBook,
  updateBook,
  deleteBook,
};
