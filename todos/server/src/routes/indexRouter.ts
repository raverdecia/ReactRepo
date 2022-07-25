import { Request, Response } from "express";
import { toNamespacedPath } from "path";
const express = require("express");
const router = express.Router();
const pool = require("../db");

/*router.get("/", async (req, res) => {
  pool.query("SELECT * FROM todo", (error, result) => {
    if (error) throw error;
    res.status(200).json(result);
  });
});*/

router.get("/", async ({ query: { id } }: Request, res: Response) => {
  id
    ? await pool.query("SELECT * FROM todo WHERE id = $1 ORDER BY id", [id])
    : await pool.query("SELECT * FROM todo ORDER BY completed DESC, id", (error: Error, todo: any) => {
        if (error) {
          throw error;
        }
        res.send(todo.rows);
      });
});

router.post("/", async ({ body: { name, completed } }: Request, res: Response) => {
  await pool.query(
    "INSERT INTO todo (name, completed) VALUES ($1, $2) RETURNING id",
    [name, completed],
    (error: Error, id: any) => {
      if (error) {
        throw error;
      }
      res.send(id);
    }
  );
});

router.put("/", async ({ body: { name, completed, id } }: Request, res: Response) => {
  await pool.query("UPDATE todo SET name = $1, completed = $2 WHERE id = $3", [name, completed, id], (error: Error) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`modified with ID: ${id}`);
  });
});

router.delete("/", async ({ query: { id } }: Request, res: Response) => {
  await pool.query("DELETE FROM todo WHERE id= $1", [id], (error: Error) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`deleted with id: ${id}`);
  });
});

module.exports = router;
