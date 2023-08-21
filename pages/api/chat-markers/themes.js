// api/chat-markers/themes.js
import pool from "../../../src/utils/db";

export default async function themes(req, res) {
  if (req.method === "GET") {
    try {
      const result = await pool.query(
        "SELECT DISTINCT theme FROM chat_markers ORDER BY theme ASC"
      );
      res.status(200).json(result.rows.map((row) => row.theme));
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
