const { Pool } = require("pg");

const db = new Pool({
  user: "postgres",
  password: "secret",
  host: "localhost",
  post: 5432,
  database: "tododb",
});

module.exports = db;
