// /api/routes  index.js

import pool from "../../../src/utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await pool.query("SELECT * FROM routes");
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "POST") {
    const {
      first_latitude,
      first_longitude,
      second_latitude,
      second_longitude,
      message,
    } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO routes (first_latitude, first_longitude, second_latitude, second_longitude, route_message) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
          first_latitude,
          first_longitude,
          second_latitude,
          second_longitude,
          message,
        ]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
