const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");

const main = async () => {
  app.use(cors());
  app.use(express.json());

  app.post("/todos", async (req, res) => {
    try {
      const { description } = req.body;

      const todo = await pool.query(
        "INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]
      );

      res.json(todo.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  });

  app.get("/todos", async (req, res) => {
    try {
      const todos = await pool.query("SELECT * FROM todo");
      res.json(todos.rows);
    } catch (error) {
      console.log(error.message);
    }
  });

  app.get("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);
      res.json(todo.rows[0]);
    } catch (error) {
      console.log(error.message);
    }
  });

  app.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;

      const update = await pool.query(
        "UPDATE todo SET description = $1 WHERE id = $2",
        [description, id]
      );

      res.json("Todo updates");
    } catch (error) {
      console.log(error.message);
    }
  });

  app.delete("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const remove = await pool.query("DELETE FROM todo WHERE id = $1", [id]);

      res.json(id + " deleted");
    } catch (error) {
      console.log(error.message);
    }
  });

  app.listen(1234, () => {
    console.log("Server running on port 1234");
  });
};

main();
